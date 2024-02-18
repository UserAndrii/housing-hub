export interface IMapContext {
  isLoaded: boolean;
  onPlaceSelect: (coordinates: { lat: number; lng: number }) => void;
}
