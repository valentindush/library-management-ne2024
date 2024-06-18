import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBookDTO } from './dto/createBook.dto';
import { UpdateBookDTO } from './dto/updateBook.dto';

@Injectable()
export class BookService { //BOOK CRUD SERVICE

    constructor(private prisma: PrismaService) { }

    // GET ALL BOOKS
    async getAllBooks() {
        try {
            const books = await this.prisma.book.findMany()
            return books
        } catch (error) {
            throw new InternalServerErrorException('Something went wrong on our end')
        }
    }

    // GET A SINGLE BOOK
    async getBook(id: number) {
        const book = await this.prisma.book.findUnique({
            where: {
                id: parseInt(id.toString())
            }
        })

        if (!book) {
            throw new NotFoundException('Book not found')
        }

        return book

    }

    // CREATE A NEW BOOK
    async createBook(data: CreateBookDTO) {
        const nameExists = await this.prisma.book.findUnique({
            where: { name: data.name }
        })

        if (nameExists) {
            throw new BadRequestException('A book with this name already exists')
        }

        const newBook = await this.prisma.book.create({
            data: {
                ...data
            }
        })

        return newBook

    }

    // UPDATE AN EXISTING BOOK
    async updateBook(id: number, data: UpdateBookDTO) {

        const book = await this.prisma.book.findUnique({
            where: {
                id: parseInt(id.toString())
            }
        })
        if (!book) {
            throw new NotFoundException('Book not found')
        }

        const updatedBook = await this.prisma.book.update({
            where: {
                id: parseInt(id.toString())
            },
            data: {
                ...data
            }
        })

        return updatedBook

    }

    // DELETE A BOOK FROM THE DATABASE
    async deleteBook(id: number) {
        const book = await this.prisma.book.findUnique({ where: { id: parseInt(id.toString()) } })
        if (!book) {
            throw new NotFoundException("Book not found")
        }
        const deletedBook = await this.prisma.book.delete({
            where: {
                id: parseInt(id.toString())
            }
        })
        return deletedBook

    }
}
