import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.book.findMany({
      include: { category: true },
    });
  }

  async create(dto: CreateBookDto) {
    return this.prisma.book.create({
      data: dto,
      include: { category: true },
    });
  }

  async remove(id: number) {
    return this.prisma.book.delete({
      where: { book_id: id },
    });
  }
}