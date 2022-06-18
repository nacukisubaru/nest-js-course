import { Module } from "@nestjs/common";

import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from "@nestjs/config";
import { User } from "./users/users.model";
import { RolesController } from './roles/roles.controller';
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/roles.model";

@Module({
    controllers: [RolesController],
    providers: [],
    imports: [
        //создает системные переменные из файла
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Role],
            autoLoadModels: true
        }),
        UsersModule,
        RolesModule
    ]
})
export class AppModule {}