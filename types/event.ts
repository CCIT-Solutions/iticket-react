export interface EventCategory {
  id: number;
  name: string;
  icon: string;
}

export interface EventStatus {
  name: string;
  value: number;
  color: string;
}

export interface EventVisibility {
  name: string;
  value: number;
  color: string;
}

export interface EventMerchant {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  avatar: string;
  birthday: string;
  created_at: string;
}

export interface EventCountry {
  id: number;
  name: string;
  code: string;
  currency: string;
}

export interface EventLocation {
  lat: string | number;
  lng: string | number;
}

export interface EventImage {
  id: number;
  name: string;
  size?: number;
  url: string;
}

export interface Event {
  id: number;
  name: string;
  slug: string;
  description: string;
  dresscode?: string | null;
  rules?: string | null;
  address?: string | null;
  location?: EventLocation;
  start_date?: string | null;
  end_date?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  expires_at?: string | null;
  created_at?: string | null;
  total_tickets?: number;
  status: EventStatus;
  merchant: EventMerchant;
  country: EventCountry;
  categories: EventCategory[];
  cover?: string | null;
  images: EventImage[];
  visibility: EventVisibility;
}
