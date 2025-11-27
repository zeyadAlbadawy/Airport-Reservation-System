import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../enums/roles';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  firstName: string | null;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  lastName: string | null;

  @Column()
  @Field(() => String)
  email: string;

  // @Column({ type: 'boolean', default: false })
  // @Field({ defaultValue: false })
  // isAdmin: boolean;

  @Column({ type: 'enum', enum: Role, default: Role.USER })
  @Field(() => Role, { defaultValue: Role.USER })
  role: Role;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  password: string | null;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  passwordResetToken: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  @Field(() => Date, { nullable: true })
  passwordResetTokenExpirationDate: Date | null;
}
