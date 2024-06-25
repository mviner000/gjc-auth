import { NextResponse } from "next/server";
import { getAllBooks } from "@/data/books";

interface Book {
  id: number;
  title: string | null;
  thumbnail_url: string | null;
}

// New function to handle GET requests for fetching all books
export async function GET(request: Request) {
  try {
    const books: Book[] = await getAllBooks();
    return NextResponse.json(books);
  } catch (error) {
    console.error("Error in GET /api/books/all: ", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
