import { Field, ID, ObjectType } from '@nestjs/graphql';
import { MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field((type) => ID)
  id: string;

  @Column()
  @Field(() => String)
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  firstName: string;

  @Column()
  @Field(() => String)
  lastName: string;

  @Column()
  @Field()
  email: string;

  @Column({ type: 'boolean', default: false })
  @Field({ defaultValue: false })
  isAdmin: Boolean;

  @Column()
  @Field()
  password: string;

  @Column({ type: 'varchar', nullable: true })
  @Field(() => String, { nullable: true })
  passwordResetToken: string | null;

  @Column({ type: 'timestamptz', nullable: true })
  @Field(() => Date, { nullable: true })
  passwordResetTokenExpirationDate: Date | null;
}
