import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import BookCart from '@/components/books/book-cart';

import { Button } from '@/components/ui/button';
import { BookText } from "lucide-react";
import Link from "next/link";

interface BookCartSheetProps {
  bookTitles: string[];
  onDeleteTitle: (title: string) => void;
  handleEmptyBookCart: () => void;
}

const CartSheet: React.FC<BookCartSheetProps> = ({ bookTitles, onDeleteTitle, handleEmptyBookCart }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button type="button" className="outline-0 shadow-md relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800  focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <BookText />
          <span className="sr-only">Notifications</span>
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border border-white rounded-full -top-2 -end-2 dark:border-gray-900">{bookTitles.length}</div>
        </button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Book Cart {bookTitles.length}</SheetTitle>
          <SheetDescription>
            These are all the books from your wishlist
          </SheetDescription>
        </SheetHeader>
        <BookCart bookTitles={bookTitles} onDeleteTitle={onDeleteTitle} />
        <SheetFooter className='gap-28'>
          {bookTitles.length > 0 && (
            <Button variant="destructive" onClick={handleEmptyBookCart}>Empty BookCart</Button>
          )}
          <SheetClose asChild>
            {bookTitles.length > 0 && (
              <Link className="hover:text-blue-500" href="/auth/login">
                <Button>
                  Proceed
                </Button>
              </Link>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;