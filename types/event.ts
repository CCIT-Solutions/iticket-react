export interface EventType {
  id: number;
  image: string;
  date: {
    en: string;
    ar: string;
  };
  time: {
    en: string;
    ar: string;
  };
  category: {
    en: string;
    ar: string;
  };
  title: {
    en: string;
    ar: string;
  };
  venue: {
    en: string;
    ar: string;
  };
}