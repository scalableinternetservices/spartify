import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm'
import { PlayedSong } from './PlayedSong'
import { Song } from './Song'
import { VotedSong } from './VotedSong'

@Unique(['name'])
@Entity()
export class Party extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  // Why specifying type varchar is necessary: https://github.com/typeorm/typeorm/issues/4139
  @Column({ nullable: true, type: 'varchar' })
  password: string | null

  @UpdateDateColumn()
  latestTime: Date

  @ManyToOne(() => Song, { lazy: true, nullable: true })
  currentSong: Promise<Song | null>

  @Column({ nullable: true })
  currentSongId: number

  @OneToMany(() => VotedSong, votedSong => votedSong.party, { lazy: true, cascade: ['remove'] })
  votedSongs: Promise<VotedSong[]>

  @OneToMany(() => PlayedSong, playedSong => playedSong.party, { lazy: true, cascade: ['remove'] })
  playedSongs: Promise<PlayedSong[]>

  constructor(name: string, password?: string) {
    super()

    this.name = name
    this.password = password || null
    this.currentSong = Promise.resolve(null)
    // Don't initialize this.playedSongs or this.votedSongs.
    //   this.playedSongs = []
    //   this.votedSongs = []
    // Causes: InitializedRelationError: Array initializations are not allowed in entity relations.
  }

  public async playNextSong() {
    await this.removeCurrentSong()
    await this.playHighestVotedSong()
  }

  public async voteForSong(song: Song) {
    let votedSong = await VotedSong.findOne({ where: { songId: song.id, partyId: this.id } })

    if (votedSong) {
      await votedSong.incrementVote()
    } else {
      votedSong = new VotedSong(song, this)
      await votedSong.save()
    }

    return votedSong
  }

  private async removeCurrentSong() {
    const currentSong = await this.currentSong

    if (currentSong) {
      const newPlayedSong = new PlayedSong(currentSong, this, await this.getNextSequenceNumber())
      this.currentSong = Promise.resolve(null)
      const playedSongs = await this.playedSongs
      playedSongs.push(newPlayedSong)
      this.playedSongs = Promise.resolve(playedSongs)
      await Promise.all([newPlayedSong.save(), this.save()])
    }
  }

  private async playHighestVotedSong() {
    const highestVotedSong = await this.getHighestVotedSong()

    if (highestVotedSong) {
      this.currentSongId = (await highestVotedSong.getSong()).id
      await Promise.all([highestVotedSong.remove(), this.save()])
    }
  }

  public async getSortedVotedSongs() {
    const votedSongs = await this.votedSongs
    const songs = await Promise.all(votedSongs.map(votedSong => votedSong.getSong()))
    const zipped: [VotedSong, Song][] = votedSongs.map((votedSong, index) => {
      return [votedSong, songs[index]]
    })
    zipped.sort(([votedSong1, song1], [votedSong2, song2]) => {
      if (votedSong1.count != votedSong2.count) {
        return votedSong2.count - votedSong1.count
      }
      if (song1.title < song2.title) {
        return -1
      }
      return 0
    })
    return zipped.map(([votedSong, _song]) => votedSong)
  }

  private async getHighestVotedSong() {
    // TODO: TypeORM can't sort by fields of eagerly joined rows. So we currently retrieve all VotedSong for the party
    //   and then sort by song name and then sort by name among the VotedSong with the highest equivalent count and then
    //   return the first VotedSong. Optimize this by using the TypeORM query builder to build an SQL query that can
    //   JOIN and then order correctly to retrieve a single VotedSong rather than all VotedSong for the party.
    const sortedVotedSongs = await this.getSortedVotedSongs()
    return sortedVotedSongs[0]
  }

  private async getNextSequenceNumber() {
    const latestSong = await PlayedSong.findOne({ where: { party: this }, order: { sequenceNumber: 'DESC' } })
    return latestSong ? latestSong.sequenceNumber + 1 : 0
  }
}
