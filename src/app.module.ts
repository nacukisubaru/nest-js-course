import { Module } from "@nestjs/common";

import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from "@nestjs/config";
@Module({
    controllers: [],
    providers: [],
    imports: [
        //создает системные переменные из файла
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'ten9285ten',
            database: 'nest-course',
            models: [],
            autoLoadModels: true
        }),
        UsersModule
    ]
})
export class AppModule {}