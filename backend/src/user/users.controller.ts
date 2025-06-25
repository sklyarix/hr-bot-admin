import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDto, GetUserByTgDto, UserDto } from './dto/user.dto';

import { UsersService } from './users.service';

// TODO прописать TS полностью

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll() {
    return this.usersService.findAllUsers();
  }

  @Get('id_tg/:idTg')
  async getByIdTg(@Param() dto: GetUserByTgDto): Promise<UserDto | null> {
    console.log(dto);
    return this.usersService.findUserByTgId(dto.idTg);
  }

  @Post()
  async create(@Body() user: CreateUserDto) {
    return this.usersService.createUser(user);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
