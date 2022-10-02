import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'users' })
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  email: string;

  @Column('text')
  password: string;

  @Column('text')
  fullName: string;

  @Column('bool', {
    default: true
  })
  isActive: string;

  @Column('text', {
    array: true,
    default: ['user']
  })
  roles: string[];
}