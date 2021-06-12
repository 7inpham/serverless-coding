import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  content: string;
}
