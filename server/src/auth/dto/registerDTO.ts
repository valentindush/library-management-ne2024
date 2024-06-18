import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, min, MinLength } from "class-validator"

export class RegisterDTO{
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(8)
    studentId: string
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    firstName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(50)
    lastName: string

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(8, {message: "Password must atleat 8 characters"})
    @MaxLength(32, {message: "The provided password is too long, password must be between 8 and 32 characters"})
    password: string
}