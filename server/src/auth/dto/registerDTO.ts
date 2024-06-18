import { ApiProperty } from "@nestjs/swagger"
import { Role } from "@prisma/client"
import { IsEmail, IsEnum, IsNotEmpty, IsString, Max, Min, min } from "class-validator"

export class RegisterDTO{
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role
}