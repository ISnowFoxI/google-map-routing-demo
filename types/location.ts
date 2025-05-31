export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface GooglePlaceDetails {
  result: {
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
    };
    formatted_address: string;
  };
}
