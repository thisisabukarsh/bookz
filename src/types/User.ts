import { Book } from "./Book";

export interface User {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  password: string | null;
  image: string | null;
  averageRating: number;
  token: string | null;
  books: Book[];
  ratings: number[];
}
