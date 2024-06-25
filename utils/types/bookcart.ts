export interface BookCart {
  id: number;
  books: number[];
  student: string;
  is_borrowed_verified: boolean | null;
  borrowed_verified_by: string | null;
  is_returned_verified: boolean | null;
  created_at: string;
  updated_at: string;
  set_to_return: boolean;
}
