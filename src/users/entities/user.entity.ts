import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ type: 'boolean', default: false })
  @Field({ defaultValue: false })
  isAdmin: boolean;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true }) // ← explicitly specify type
  password: string | null;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  passwordResetToken: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  @Field(() => Date, { nullable: true })
  passwordResetTokenExpirationDate: Date | null;
}
