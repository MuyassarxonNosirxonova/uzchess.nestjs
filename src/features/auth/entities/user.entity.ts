import {BaseModel} from "@core/base.model";
import {Column, Entity, OneToMany} from "typeorm";
import {UserType} from '@/enums/user-type.enum';
import {UserRole} from "@/features/auth/entities/user-role.entity";
import {UserPermission} from "@/features/auth/entities/user-permission.entity";
import {Otp} from "@/features/auth/entities/otp.entity";

export enum LoginType {
  Email = "email",
  Number = "number"
}


@Entity('users')
export class User extends BaseModel {
  @Column({type: 'enum', enum: LoginType})
  loginType: LoginType

  @Column({length: 96, unique: true})
  username: string;

  @Column({length: 64})
  fullName: string;

  @Column({length: 128, nullable: true})
  password?: string;

  @Column({type: "enum", enum: UserType, default: UserType.User})
  type: UserType;

  @Column({default: false})
  isVerified: boolean;

  @OneToMany(() => UserRole, (ur) => ur.user)
  userRoles: UserRole[];

  @OneToMany(() => UserPermission, (ur) => ur.user)
  userPermissions: UserPermission[];

  @OneToMany(()=>Otp, otp=>otp.user)
  otps: Otp[]


}