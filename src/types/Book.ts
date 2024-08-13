export interface Book {
  id: number;
  title: string;
  condition: string;
  description: string;
  availability: string;
  category: string;
  images: string[];
  imageUrls: string[];
  userId: number;
  userName: string;
  phoneNumber: string | null;
}
