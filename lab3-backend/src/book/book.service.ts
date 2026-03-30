import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.book.findMany({
      include: {
        category: true,
      },
      orderBy: {
        book_id: 'asc',
      },
    });
  }

  async create(dto: CreateBookDto) {
    return this.prisma.book.create({
      data: {
        title: dto.title,
        isbn: dto.isbn,
        publication_year: dto.publication_year,
        total_copies: dto.total_copies,
        available_copies: dto.available_copies,
        category_id: dto.category_id,
      },
      include: {
        category: true,
      },
    });
  }
}