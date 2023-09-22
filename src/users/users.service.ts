import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: [
        'id',
        'email',
        'name',
        'surname',
        'username',
        'roles',
        'isActive',
      ],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return await this.userRepository.findOneBy({ username: username });
    // return this.users.find((user) => user.username === username);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }
    this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOneBy({ id: id });
    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.userRepository.delete({ id: id });
    if (user.affected == 0) {
      throw new NotFoundException('Usuario no encontrado');
    }
    return user;
  }
}
