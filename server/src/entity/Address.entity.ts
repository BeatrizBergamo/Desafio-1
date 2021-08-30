import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./User.entity";

@Entity('address')
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  cep: string;
  
  @Column()
  street: string;
  
  @Column()
  streetNumber: string;
  
  @Column({ nullable: true })
  complement?: string;
  
  @Column()
  neighborhood: string;
  
  @Column()
  state: string;
  
  @Column()
  city: string;

  @OneToOne(() => UserEntity, (user) => user.address, { onDelete: 'CASCADE'})
  @JoinColumn({ name: 'user_id'})
  user: UserEntity;
}