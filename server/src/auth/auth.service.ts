import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDTO } from './dto/registerDTO';
import { LoginDTO } from './dto/loginDTO';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService, private jwtService :JwtService) {}

    async register(data: RegisterDTO){
        const emailExists = await this.prisma.user.findUnique({where: {email: data.email}})

        if(emailExists){
            throw new BadRequestException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user  = await this.prisma.user.create({
            data: {
                email: data.email,
                password: hashedPassword,
                role: data.role
            }
        })

        const token = this.jwtService.sign({id: user.id, email: user.email, role: user.role});
        
        return {accessToken: token}
    }

    async login(data: LoginDTO){

        const user = await this.prisma.user.findUnique({where: {email: data.email}})

        if(!user){
            throw new BadRequestException('Invalid credentials');
        }
        const passwordMatch = await bcrypt.compare(data.password, user.password);
        if(!passwordMatch){
            throw new BadRequestException('Invalid credentials');
        }

        const token = this.jwtService.sign({id: user.id, email: user.email, role: user.role});

        return {accessToken: token}
    }
}
