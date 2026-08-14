import {SetMetadata} from "@nestjs/common";
import { UserType } from '@/enums/user-type.enum';


export const RolesKey = "roles";
export const Roles = (...roles: UserType[]) => SetMetadata(RolesKey, roles);