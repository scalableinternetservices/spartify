import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Party } from './Party'
import { Song } from './Song'

@Unique(['party', 'sequenceNumber'])
@Entity()
export class PlayedSong extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  sequenceNumber: number

  @ManyToOne(() => Song)
  song: Song

  @ManyToOne(() => Party, party => party.playedSongs)
  party: Party

  constructor(song: Song, party: Party, sequenceNumber: number) {
    super()

    this.song = song
    this.party = party
    this.sequenceNumber = sequenceNumber
  }
}
