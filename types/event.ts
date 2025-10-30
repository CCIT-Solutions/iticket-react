import { EventCategory } from "./eventCategory";

export interface Event {
  id: number;
  title: string;
  description?: string;
  image?: string;
  starts_at: string;
  ends_at?: string;
  location?: string;
  price?: number | string;
  categories: EventCategory[];
  created_at?: string;
  updated_at?: string;
}