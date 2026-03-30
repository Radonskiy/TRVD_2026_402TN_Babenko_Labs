import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { BookService } from './book.service';
import { BookController } from './book.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret_key',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}