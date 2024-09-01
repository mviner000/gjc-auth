import { NextResponse } from "next/server";
import { getAllBooks } from "@/data/books";
import { cleanThumbnailUrl } from "@/utils/clean_thumbnail";

interface Book {
  id: number;
  title: string | null;
  thumbnail_url: string | null;
  copyright: number | null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageSize = parseInt(searchParams.get("page_size") || "10");
    const cursor = searchParams.get("cursor");
    const sortOrder = searchParams.get("sortOrder") || "asc";
    const sortBy = searchParams.get("sortBy") || "id"; // Sort by ID or Copyright

    let allBooks: Book[] = await getAllBooks();

    // Clean up thumbnail URLs
    allBooks = allBooks.map((book) => ({
      ...book,
      thumbnail_url: cleanThumbnailUrl(book.thumbnail_url),
    }));

    // Sort the books by specified criteria
    if (sortBy === "copyright") {
      allBooks =
        sortOrder === "desc"
          ? allBooks.sort((a, b) => (b.copyright ?? 0) - (a.copyright ?? 0))
          : allBooks.sort((a, b) => (a.copyright ?? 0) - (b.copyright ?? 0));
    } else {
      allBooks =
        sortOrder === "desc"
          ? allBooks.sort((a, b) => b.id - a.id)
          : allBooks.sort((a, b) => a.id - b.id);
    }

    // Find the index of the last book fetched
    const startIndex = cursor
      ? allBooks.findIndex((book) => book.id.toString() === cursor) + 1
      : 0;

    const endIndex = startIndex + pageSize;

    const paginatedBooks = allBooks.slice(startIndex, endIndex);

    // Prepare the response with the paginated results
    return NextResponse.json({
      results: paginatedBooks,
      nextCursor:
        paginatedBooks.length > 0
          ? paginatedBooks[paginatedBooks.length - 1].id.toString()
          : null,
    });
  } catch (error) {
    console.error("Error in GET /api/books/paginated: ", error);
    return NextResponse.json(
      { error: "Failed to fetch books" },
      { status: 500 }
    );
  }
}
