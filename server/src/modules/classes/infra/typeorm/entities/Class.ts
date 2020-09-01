import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import ClassSchedule from './ClassSchedule';

@Entity('classes')
export default class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string;

  @Column('decimal')
  cost: number;

  @Column()
  user_id: string;

  @OneToOne(() => User, user => user.class)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ClassSchedule, classSchedule => classSchedule.class, {
    eager: true,
  })
  schedules: ClassSchedule[];
}
