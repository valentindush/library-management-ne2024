import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService){}

    async getAll(){
        return this.prisma.user.findMany({
            select: {
                email: true,
                role: true
            }
        })
    }
}
