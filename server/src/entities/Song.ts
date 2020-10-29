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

  // Why specifying type varchar is necessary: https://github.com/typeorm/typeorm/issues/4139
  @Column({ nullable: true, type: 'varchar' })
  album: string | null
}
