import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { UserGender } from "src/common/enums/emuns";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsString()
    @IsOptional()
    photo?: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserGender)
    @IsNotEmpty()
    gender: UserGender;
}
