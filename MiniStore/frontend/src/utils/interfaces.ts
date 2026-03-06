export interface Product {
  id: string | number;
  thumbnail: string;
  title: string;
  price: number;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}
