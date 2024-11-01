import { Injectable } from "@nestjs/common";
import { ManagerError } from "src/common/errors/manager.error";
import { PaginationDto } from '../common/dtos/pagination/pagination.dto';
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto"
import { ResponseAllUsers } from "./interfaces/response-users.interface";
import { UserGender, UserRole } from "src/common/enums/emuns";

@Injectable()
export class UsersService {

    private users: UserEntity[] = [
        { id: 1, name: 'ali', age: 200, photo: 'asdf', email:'ali@email.com', password:'1234', gender: UserGender.MALE , isActive: true},
        { id: 2, name: 'gilharyth', age: 20, photo: 'asdf', email:'gilharyth@email.com', password:'1234', gender: UserGender.FEMALE , isActive: true},
        { id: 3, name: 'gregory', age: 20, photo: 'asdf', email:'gregory@email.com', password:'1234', gender: UserGender.MALE , isActive: true},
        { id: 1, name: 'angel', age: 20, photo: 'asdf', email:'angel@email.com', password:'1234', gender: UserGender.MALE , isActive: true},
    ];

    async create(createUserDto: CreateUserDto): Promise<UserEntity> {
        try {
            const user: UserEntity = {
                ...createUserDto,
                isActive: true,
                id: this.users.length + 1,
                role: UserRole.USER,
            }

            this.users.push(user);

            return user;
        } catch (error) {

        }
    }

    async findAll(paginationDto: PaginationDto): Promise<ResponseAllUsers> {
        const { limit, page } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            if (this.users.length === 0) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'Users not found!',
                })
            }

            const total = this.users.filter((user) => user.isActive === true).length;
            const lastPage = Math.ceil(total / limit);
            const data = this.users.filter((user) => user.isActive === true).slice(skip, limit);

            return {
                page,
                limit,
                lastPage,
                total,
                data,
            };
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async findOne(id: number): Promise<UserEntity> {
        try {
            const user = this.users.find((user) => user.id === id && user.isActive === true);
            if (!user) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'User not found',
                });
            }
            return user;
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async update(id: number, UpdateUserDto: UpdateUserDto): Promise<UserEntity> {
        try {
            const indexUser = this.users.findIndex((user) => user.id === id && user.isActive === true);
            if (indexUser === -1) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'Users not found',
                });
            }

            this.users[indexUser] = {
                ...this.users[indexUser],
                ...UpdateUserDto,
            }
            return this.users[indexUser]
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async remove(id: number): Promise<UserEntity> {
        try {
            const indexUser = this.users.findIndex((user) => user.id === id && user.isActive === true);
            if (indexUser === -1) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'ser not found',
                });
            }

            this.users[indexUser] = {
                ...this.users[indexUser],
                isActive: false,
            }

            return this.users[indexUser]

        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }
}