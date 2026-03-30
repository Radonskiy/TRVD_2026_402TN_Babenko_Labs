export class CreateBookDto {
  title: string;
  isbn: string;
  publication_year: number;
  total_copies: number;
  available_copies: number;
  category_id: number;
}