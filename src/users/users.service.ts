import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import * as admin from 'firebase-admin';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const auth = admin.auth();
    const record = await auth.createUser({
      email: createUserDto.email,
      password: createUserDto.password,
      displayName: createUserDto.name,
    });
    const user = {
      id: record.uid,
      ...createUserDto,
    };
    await this.usersRepository.insert(user);
    return user;
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return {};
  }

  async remove(id: string) {
    const auth = admin.auth();
    auth.deleteUser(id);
    return;
  }
}
