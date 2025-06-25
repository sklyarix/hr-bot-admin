import { Repository } from 'typeorm';
import { CreateUserDto, UserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    findAllUsers(): Promise<UserDto[]>;
    findUserByTgId(idTg: string): Promise<UserDto | null>;
    findUserByUserId(userId: number): Promise<UserDto | null>;
    createUser(dto: CreateUserDto): Promise<UserDto>;
    deleteUser(id: number): Promise<UserDto>;
}
