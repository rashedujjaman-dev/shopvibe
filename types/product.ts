export interface Product {
  id: string;
  name: string;
  category: "Smart Watch" | "Earbuds" | "Headphones" | "Power Bank" | "Wireless Speaker";
  image: string;
  price: number;
  discountPrice?: number;
  badge?: string;
}