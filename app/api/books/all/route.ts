import { NextResponse } from "next/server";
import { getAllBooks } from "@/data/books";
import { cleanThumbnailUrl } from "@/utils/clean_thumbnail";

interface Book {
  id: number;
  controlno: string | null;
  title: string | null;
  thumbnail_url: string | null;
  author_code: number | null;
  copyright: number | null;
  callno: string | null;
}

// New function to handle GET requests for fetching all books
export async function GET(request: Request) {
  try {
    let books: Book[] = await getAllBooks();

    // Clean up thumbnail URLs
    books = books.map((book) => ({
      ...book,
      thumbnail_url: cleanThumbnailUrl(book.thumbnail_url),
    }));

    return NextResponse.json(books);
  } catch (error) {
    console.error("Error in GET /api/books/all: ", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
