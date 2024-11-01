import { UserGender, UserRole } from "src/common/enums/emuns";


export class UserEntity {
    id: number;
    name: string;
    age: number;
    photo?:string;
    email: string;
    password:string;
    role?: UserRole;
    gender: UserGender;
    isActive: boolean;
}