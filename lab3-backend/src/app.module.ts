import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, BookModule, AuthModule],
})
export class AppModule {}