import { RoutesBody } from '@/types/route';
import axios from 'axios';

export const getRoute = (body: RoutesBody) => {
  return axios.post('https://routes.googleapis.com/directions/v2:computeRoutes', body, {
    headers: {
      'Content-Type': 'application/json',
      charset: 'utf-8',
      'X-Goog-Api-Key': process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
      'X-Goog-FieldMask':
        'routes.duration,routes.distanceMeters,routes.polyline,routes.legs,routes.travelAdvisory.tollInfo,routes.legs.travelAdvisory.tollInfo,routes.travelAdvisory.speedReadingIntervals',
    },
  });
};
