export interface Book {
  id: number;
  title: string;
  author_name: string;
  subject_name: string;
  thumbnail_url: string;
  publisher: string;
  pubplace: string;
  pagination: string;
  edition: string;
}

export interface Subject {
  id: number;
  subject_name: string;
  temp_id: number | null;
  subject_code: string;
  books: Book[];
}
