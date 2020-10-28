import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Unique(['title', 'artist', 'album'])
@Entity()
export class Song extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  artist: string

  @Column({ nullable: true, type: 'varchar' })
  album: string | null
}
