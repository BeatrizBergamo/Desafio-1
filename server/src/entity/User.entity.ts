import { Gender, MaritalStatus } from '../model/user.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { AddressEntity } from './Address.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  job: string;  

  @Column()
  birthDate: string;

  @Column({ nullable: true })
  maritalStatus?: MaritalStatus;

  @Column({ nullable: true })
  gender?: Gender;

  @Column()
  celphone: string;

  @Column({ nullable: true })
  telphone?: string;

  @Column({ nullable: true })
  rg?: string;

  @Column({ unique: true })
  cpf: string;

  @Column({ nullable: true })
  vehicle?: boolean;

  @Column({ nullable: true })
  licence?: boolean;

  @OneToOne(() => AddressEntity, (address) => address.user, { cascade: true })
  address: AddressEntity;
}
