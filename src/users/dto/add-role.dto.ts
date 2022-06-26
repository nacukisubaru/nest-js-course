import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {

    @ApiProperty({example: '5', description: 'id пользователя'})
    @IsNumber({}, {message:"Должно быть числом"})
    readonly userId: number;

    @ApiProperty({example: '1-ADMIN, 2-USER', description: 'Роль'})
    @IsString({message: "Должно быть строкой"})
    readonly value: string;
}