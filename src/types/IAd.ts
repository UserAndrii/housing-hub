export interface IAd {
  id: number;
  position: { lat: number; lng: number };
  title: string;
  price: number;
  images: string;
  description: string;
}
