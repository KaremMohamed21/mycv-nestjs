import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  // create new user
  create(email: string, password: string) {
    const user = this.usersRepository.create({ email, password });
    user.save();

    return user;
  }

  // find user by id
  fineOne(id: number) {
    const user = this.usersRepository.findOne({ where: { id } });
    if (!user) throw new Error('User not found');

    return user;
  }

  // find all users with email
  find(email: string) {
    const users = this.usersRepository.find({ where: { email } });
    if (!users) throw new Error('Users not found');

    return users;
  }

  // update user
  update(id: number, user: Partial<User>) {
    this.usersRepository.update(id, user);

    return this.usersRepository.findOne({ where: { id } });
  }

  // delete user
  async delete(id: number) {
    const user = await this.usersRepository.find({ where: { id } });
    if (!user) throw new Error('User not found');

    this.usersRepository.remove(user);
  }
}
