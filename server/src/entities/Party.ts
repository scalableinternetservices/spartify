import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn
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

  @ManyToOne(() => Song, { eager: true, nullable: true })
  currentSong: Song | null

  @OneToMany(() => VotedSong, votedSong => votedSong.party, { eager: true, cascade: ['remove'] })
  votedSongs: VotedSong[]

  @OneToMany(() => PlayedSong, playedSong => playedSong.party, { eager: true, cascade: ['remove'] })
  playedSongs: PlayedSong[]

  constructor(name: string, password?: string) {
    super()

    this.name = name
    this.password = password || null
    this.currentSong = null
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
    let votedSong = await VotedSong.findOne({ song: song, party: this })

    if (votedSong) {
      await votedSong.incrementVote()
    } else {
      votedSong = new VotedSong(song, this)
      await votedSong.save()
    }

    return votedSong
  }

  private async removeCurrentSong() {
    if (this.currentSong) {
      const newPlayedSong = new PlayedSong(this.currentSong, this, await this.getNextSequenceNumber())
      this.currentSong = null
      await Promise.all([newPlayedSong.save(), this.save()])
    }
  }

  private async playHighestVotedSong() {
    const highestVotedSong = await this.getHighestVotedSong()

    if (highestVotedSong) {
      this.currentSong = highestVotedSong.song
      await Promise.all([highestVotedSong.remove(), this.save()])
    }
  }

  private async getHighestVotedSong() {
    return VotedSong.findOne({ where: { party: this }, order: { count: 'DESC' } })
  }

  private async getNextSequenceNumber() {
    const latestSong = await PlayedSong.findOne({ where: { party: this }, order: { sequenceNumber: 'DESC' } })
    return latestSong ? latestSong.sequenceNumber : 0
  }
}
