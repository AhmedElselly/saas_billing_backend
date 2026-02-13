import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findByEmail(email: string) {
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
      relations: {
        tenant: true,
      },
    });
    console.log({ user });
    return user;
  }
}
