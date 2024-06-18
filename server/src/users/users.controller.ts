import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { AuthGuard } from "src/auth/auth.guard";

@UseGuards(AuthGuard)
@Controller("users")
@ApiTags("Users")
export class UsersController{

    constructor(private usersService: UsersService){}

    @Get()
    getAllUsers(){
        return this.usersService.getAll()
    }
}