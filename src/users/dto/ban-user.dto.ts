import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {

    @ApiProperty({example: 'Матюкался', description: 'Причина'})
    readonly banReason: string;
    @ApiProperty({example: '5', description: 'id пользователя'})
    readonly userId: number;
}