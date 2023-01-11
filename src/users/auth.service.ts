import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { User } from './user.entity';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string): Promise<User> {
    // Check if the email exists
    const [user] = await this.usersService.find(email);
    if (user) throw new BadRequestException('Email exists');

    // Hash the password
    // -- create salt
    const salt = randomBytes(8).toString('hex');

    // -- hash the password and the salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // -- save the password with the hashed salt
    const result = salt + '.' + hash.toString('hex');

    // create the email
    const newUser = await this.usersService.create(email, result);

    // return the email
    return newUser;
  }

  async signin(email: string, password: string): Promise<User> {
    // Check if the email exists
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('Email does not exist');

    // compare the password
    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('Invalid email or password');

    return user;
  }
}
