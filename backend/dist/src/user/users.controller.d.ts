import { CreateUserDto, GetUserByTgDto, UserDto } from './dto/user.dto';
import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAll(): Promise<UserDto[]>;
    getByIdTg(dto: GetUserByTgDto): Promise<UserDto | null>;
    create(user: CreateUserDto): Promise<UserDto>;
    delete(id: number): Promise<UserDto>;
}
