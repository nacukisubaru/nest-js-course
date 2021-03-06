import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
    //иньектируем модель User в InjectModel
    constructor(@InjectModel(User) private userRepository: typeof User,
        private rolesService: RolesService) {}
 
    async createUser(dto: CreateUserDto) {
        const userExist = await this.getUserByEmail(dto.email)
        if(userExist) {
            throw new HttpException(`Пользователь c email ${userExist.email} уже существует !`,HttpStatus.BAD_REQUEST);
        }
        const user = await this.userRepository.create(dto);
        const role = await this.rolesService.getRoleByValue("ADMIN");
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

    async addRole(dto: AddRoleDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        const role = await this.rolesService.getRoleByValue(dto.value);
        if(role && user) {
            user.$add('role', role.id);
            return dto;
        }

        throw new HttpException('Пользователь или роль не найдены!',HttpStatus.NOT_FOUND);
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if(!user) {
            throw new HttpException('Пользователь не найден!',HttpStatus.NOT_FOUND);
        }
        if(user.banned) {
            throw new HttpException('Пользователь уже в бане!',HttpStatus.BAD_REQUEST);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
}
