import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    //иньектируем модель User в InjectModel
    constructor(@InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService) {}
 
    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.rolesService.getRoleByValue("USER");
        //установка роли для пользователя
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async getAllUsers() {
        //c помощью {include: {all: true}} вытаскиваем пользователя вместе с ролью
        return await this.userRepository.findAll({include: {all: true}});
    }

    async getUserByEmail(email: string) {
       return await this.userRepository.findOne({where: {email}, include: {all: true}});
    }
}
