import { UserEntity } from '../user/user.entity';
export declare class UserProfileEntity {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    fullName: string;
    age: number;
    city: string;
    user: UserEntity;
}
