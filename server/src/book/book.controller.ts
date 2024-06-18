import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { CreateBookDTO } from './dto/createBook.dto';
import { BookService } from './book.service';
import { UpdateBookDTO } from './dto/updateBook.dto';
import { Roles } from 'utils/decorators/roels.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('book')
@ApiTags('Books')
@ApiResponse({ status: 400, description: "Bad Request" })
@ApiResponse({ status: 500, description: "Internal Server Error" })
@UseGuards(AuthGuard)
export class BookController { // BOOKS CRUD CONTROLLER

    constructor(private bookService: BookService) { }

    @Get('/')
    @ApiResponse({ status: 200, description: "Ok" })
    getAllBooks() {
        return this.bookService.getAllBooks()
    }

    @Get('/:id')
    @ApiResponse({ status: 200, description: "Ok" })
    getBook(@Param('id') id: number) {
        return this.bookService.getBook(id)
    }

    @Post('/')
    @Roles(Role.ADMIN)
    @ApiResponse({ status: 201, description: "Created" })
    createBook(@Body() data: CreateBookDTO) {
        return this.bookService.createBook(data)
    }

    @Put('/:id')
    @Roles(Role.ADMIN)
    @ApiResponse({ status: 200, description: "Updated" })
    updateBook(@Body() data: UpdateBookDTO, @Param('id') id: number) {
        return this.bookService.updateBook(id, data)
    }

    @Delete('/:id')
    @Roles(Role.ADMIN)
    @ApiResponse({ status: 200, description: "Deleted" })
    deleteBook(@Param('id') id: number) {
        return this.bookService.deleteBook(id)
    }
}