import {
  BaseEntity,
  Column,
  Entity,
  getRepository,
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

  @OneToMany(() => VotedSong, votedSong => votedSong.party, { lazy: true, cascade: ['remove'], onDelete: 'CASCADE' })
  votedSongs: Promise<VotedSong[]>

  @OneToMany(() => PlayedSong, playedSong => playedSong.party, { lazy: true, cascade: ['remove'], onDelete: 'CASCADE' })
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
    let votePromise: Promise<any>

    if (votedSong) {
      votePromise = votedSong.incrementVote()
    } else {
      votedSong = new VotedSong(song, this)
      votePromise = votedSong.save()
    }

    await Promise.all([votePromise, this.updateLatestTime()])

    return votedSong
  }

  private async updateLatestTime() {
    return getRepository(Party)
      .createQueryBuilder('party')
      .update({ latestTime: () => 'CURRENT_TIMESTAMP()' })
      .where('id = :id', { id: this.id })
      .execute()
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

  public async getCurrentSong() {
    return Song.findOne(this.currentSongId)
  }

  private async playHighestVotedSong() {
    const highestVotedSong = await this.getHighestVotedSong()

    if (highestVotedSong) {
      const newCurrentSongId = (await highestVotedSong.getSong()).id
      await Promise.all([
        highestVotedSong.remove(),
        getRepository(Party)
          .createQueryBuilder('party')
          .update({ currentSongId: newCurrentSongId })
          .where('id = :id', { id: this.id })
          .execute(),
      ])
    }
  }

  public async getSortedVotedSongs() {
    return getRepository(VotedSong)
      .createQueryBuilder('voted_song')
      .innerJoinAndSelect('voted_song.song', 'song', 'voted_song.partyId = :partyId', { partyId: this.id })
      .orderBy({ 'voted_song.count': 'DESC', 'song.title': 'ASC' })
      .getMany()
  }

  private async getHighestVotedSong() {
    return getRepository(VotedSong)
      .createQueryBuilder('voted_song')
      .innerJoinAndSelect('voted_song.song', 'song', 'voted_song.partyId = :partyId', { partyId: this.id })
      .orderBy({ 'voted_song.count': 'DESC', 'song.title': 'ASC' })
      .limit(1)
      .getOne()
  }

  private async getNextSequenceNumber() {
    const latestSong = await PlayedSong.findOne({ where: { party: this }, order: { sequenceNumber: 'DESC' } })
    return latestSong ? latestSong.sequenceNumber + 1 : 0
  }
}
