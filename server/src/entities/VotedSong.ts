import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Party } from './Party'
import { Song } from './Song'

@Unique(['party', 'song'])
@Entity()
export class VotedSong extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  count: number

  @ManyToOne(() => Song, { eager: true })
  song: Song

  @ManyToOne(() => Party, party => party.votedSongs)
  party: Party

  constructor(song: Song, party: Party) {
    super()
    this.song = song
    this.party = party
    this.count = 1
  }

  public async incrementVote() {
    ++this.count
    await this.save()
  }
}
