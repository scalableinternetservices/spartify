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

  @ManyToOne(() => Song, { lazy: true, nullable: false })
  song: Promise<Song>

  @Column()
  songId: number

  @ManyToOne(() => Party, party => party.votedSongs, { nullable: false, lazy: true })
  party: Promise<Party>

  @Column()
  partyId: number

  constructor(song: Song, party: Party) {
    super()
    this.song = Promise.resolve(song)
    this.party = Promise.resolve(party)
    this.count = 1
  }

  public async incrementVote() {
    ++this.count
    await this.save()
  }

  // For some reason the Song or Party fields return Promise<undefined> (I think a TypeORM bug), so we need the following two methods.
  // Piazza question: https://piazza.com/class/kfpm567u1e24eb?cid=123.
  public async getParty() {
    return Party.findOneOrFail(this.partyId)
  }

  public async getSong() {
    return Song.findOneOrFail(this.songId)
  }
}
