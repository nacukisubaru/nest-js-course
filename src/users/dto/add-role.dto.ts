import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {

    @ApiProperty({example: '5', description: 'id пользователя'})
    readonly userId: number;
    @ApiProperty({example: '1-ADMIN, 2-USER', description: 'Роль'})
    readonly value: string;
}