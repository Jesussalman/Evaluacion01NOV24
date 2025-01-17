import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from "@nestjs/common";
import { PaginationDto } from "src/common/dtos/pagination/pagination.dto";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('users')
export class UsersController {

    constructor( private readonly usersService: UsersService ){}
    
    @Post()
    create( @Body() createUserDto: CreateUserDto ){
        return this.usersService.create(createUserDto);
    }

    @Get()
    findAll( @Query() paginationDto: PaginationDto ){
        return this.usersService.findAll( paginationDto );
    }

    @Get(':id')
    findOne( @Param('id', ParseIntPipe) id: number ){
        return this.usersService.findOne(id);
    }

    @Patch(':id')
    update( @Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto ){
        return this.usersService.update(id, updateUserDto);
    }
    
    @Delete(':id')
    remove( @Param('id', ParseIntPipe) id: number ){
        return this.usersService.remove(id);
    }
}
