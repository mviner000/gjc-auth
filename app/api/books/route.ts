import { NextResponse } from "next/server";
import { getAllBooks } from "@/data/books";

interface Book {
  id: number;
  title: string | null;
  thumbnail_url: string | null;
}

export async function GET(request: Request): Promise<Response> {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  async function fetchBooks(query: string | null): Promise<Book[]> {
    const books: Book[] = await getAllBooks();

    if (query) {
      const lowercasedQuery = query.toLowerCase();
      return books.filter((book) =>
        book.title?.toLowerCase().includes(lowercasedQuery)
      );
    }

    return [];
  }

  const books = await fetchBooks(query);

  return NextResponse.json({ data: books });
}
