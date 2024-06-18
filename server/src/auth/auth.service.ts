import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDTO } from './dto/registerDTO';
import { LoginDTO } from './dto/loginDTO';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {

    constructor(private readonly prisma: PrismaService, private jwtService: JwtService) { }

    async register(data: RegisterDTO) {

        try {
            const studentIdExists = await this.prisma.user.findUnique({
                where: {
                    studentId: data.studentId
                }
            })

            if (studentIdExists) {
                throw new BadRequestException('Student with the same ID exists')
            }

            const emailExists = await this.prisma.user.findUnique({ where: { email: data.email } })

            if (emailExists) {
                throw new BadRequestException('Email already exists');
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const user = await this.prisma.user.create({
                data: {
                    studentId: data.studentId,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    password: hashedPassword,
                    role: Role.STUDENT
                }
            })

            const token = this.generateToken(user)
            return { accessToken: token }
        } catch (error) {
            throw new InternalServerErrorException("Somethin went wrong on our end")
        }
    }

    async login(data: LoginDTO) {

        const user = await this.prisma.user.findUnique({ where: { email: data.email } })

        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }
        const passwordMatch = await bcrypt.compare(data.password, user.password);
        if (!passwordMatch) {
            throw new BadRequestException('Invalid credentials');
        }

        const token = this.generateToken(user)
        return { accessToken: token }
    }

    //Generate a JWT token
    generateToken(payload: any){
        return this.jwtService.sign({ id: payload.id, studentId: payload.studentId, firstName: payload.firstName, lastName: payload.lastName, email: payload.email, role: payload.role });
    }
}
