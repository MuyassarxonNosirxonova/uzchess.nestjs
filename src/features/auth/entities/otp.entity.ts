import {BaseModel} from "@core/base.model";
import {Column, Entity, ManyToOne} from "typeorm";
import {User} from "@/features/auth/entities/user.entity";

@Entity("otps")
export class Otp extends BaseModel {
  @Column()
  userId: number;

  @ManyToOne(() => User, user => user.otps, {onDelete: "CASCADE"})
  user: User;

  @Column({length: 6})
  code: string;

  @Column({default: false})
  isVerified: boolean;
}