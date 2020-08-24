import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Class from '@modules/classes/infra/typeorm/entities/Class';

@Entity('class_schedules')
export default class ClassSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  week_day: number;

  @Column('int')
  from: number;

  @Column('int')
  to: number;

  @Column()
  class_id: string;

  @ManyToOne(() => Class, classItem => classItem.schedules)
  @JoinColumn({ name: 'class_id' })
  class: Class;
}
