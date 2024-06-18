import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/loginDTO';
import { RegisterDTO } from './dto/registerDTO';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({status: 200, description: "Ok"})
    @ApiResponse({status: 400, description: "Bad Request"})
    @ApiResponse({status: 500, description: "Internal Server Error"})
    login(@Body() data: LoginDTO) {
        return this.authService.login(data)
    }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({status: 201, description: "Created"})
    @ApiResponse({status: 400, description: "Bad Request"})
    @ApiResponse({status: 500, description: "Internal Server Error"})
    register(@Body() data: RegisterDTO){
        return this.authService.register(data)
    }
}
