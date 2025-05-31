import axios from 'axios';

const getReverseGeoCode = (lat: number, long: number) => {
  return axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
  );
};

const getGoogleAutoComplete = (searchText: string) => {
  return axios.get(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchText}&inputtype=textquery&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
  );
};

const getGooglePlaceDetails = (placeId: string) => {
  return axios.get(
    `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY}`
  );
};

export { getGoogleAutoComplete, getGooglePlaceDetails, getReverseGeoCode };
