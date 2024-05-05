export interface Author {
    id: string;
    author_name: string;
    author_code: string;
    books: Book[];
  }
  
  export interface AuthorsPageProps {}
  
  export interface AuthorsPageState {
    authors: Author[];
    newAuthorName: string;
    page: number;
    totalPagesCount: number;
  }
  
  export interface Book {
    id: number;
    title: string;
  }