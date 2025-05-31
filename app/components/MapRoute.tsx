import { decodeRoutesPolyline } from '@/utils/routeDecoder';
import React from 'react';
import { Polyline } from 'react-native-maps';

interface Route {
  polyline: {
    encodedPolyline: string;
  };
}

interface MapRouteProps {
  route: Route;
  index: number;
  handlePress: (route: Route) => void;
  isActive: boolean;
}

const MapRoute = ({ route, handlePress, isActive }: MapRouteProps) => {
  const coordinates = decodeRoutesPolyline(route.polyline.encodedPolyline);
  const onPress = () => {
    handlePress(route);
  };

  return (
    <Polyline
      style={{ zIndex: isActive ? 1 : 0 }}
      tappable
      onPress={onPress}
      strokeColor={isActive ? 'blue' : 'gray'}
      coordinates={coordinates}
      strokeWidth={4}
    />
  );
};

export default MapRoute;
