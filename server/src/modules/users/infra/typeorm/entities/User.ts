import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import Class from '@modules/classes/infra/typeorm/entities/Class';
import ClassSchedule from '@modules/classes/infra/typeorm/entities/ClassSchedule';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  whatsapp: string;

  @Column()
  bio: string;

  @Column()
  avatar: string;

  @OneToOne(() => Class, classItem => classItem.user)
  class: Class;

  @Expose({ name: 'avatar_url' })
  getAvatarUrl() {
    if (!this.avatar) {
      return null;
    }
    return `http://localhost:3333/files/${this.avatar}`;
  }
}
