import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  // create new user
  async create(email: string, password: string) {
    const user = await this.usersRepository.create({ email, password });
    user.save();

    return user;
  }

  // find user by id
  async fineOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException();

    return user;
  }

  // find all users with email
  async find(email: string) {
    const users = await this.usersRepository.find({ where: { email } });
    if (!users) throw new NotFoundException();

    return users;
  }

  // update user
  async update(id: number, user: Partial<User>) {
    await this.usersRepository.update(id, user);

    return this.usersRepository.findOne({ where: { id } });
  }

  // delete user
  async delete(id: number) {
    const user = await this.usersRepository.find({ where: { id } });
    if (!user) throw new NotFoundException();

    this.usersRepository.remove(user);
  }
}
