export type PropertyType = 'Appartement' | 'Maison';

export interface Logement {
  id: number;
  title: string;
  city: string;
  area: string;
  price: number;
  rooms: number;
  size: number;
  type: PropertyType;
  image: string;
  imageAlt: string;
  tag?: string;
}
