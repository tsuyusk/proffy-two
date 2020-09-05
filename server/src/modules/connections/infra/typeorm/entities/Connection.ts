import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('connections')
export default class Connection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;
}
