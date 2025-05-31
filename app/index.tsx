import { useGoogleRoutes } from '@/hooks/mutations/useGoogleRoutes';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, Region, UserLocationChangeEvent } from 'react-native-maps';

import { Route } from '@/types/route';
import { read, storageKeys } from '@/utils/storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DistanceDisplay from './components/DistanceDisplay';
import MapRoute from './components/MapRoute';
import RouteInstructions from './components/RouteInstructions';
import SearchBar from './components/SearchBar';

const getSavedData = () => {
  const data = read(storageKeys.route) || '';
  if (data) {
    return JSON.parse(data);
  }
  return undefined;
};

const Main = () => {
  const mapRef = useRef<MapView>(null);
  const [currentLocation, setCurrentLocation] = useState<Region | undefined>(undefined);
  const [initialRegion, setInitialRegion] = useState<Region | undefined>(undefined);
  const [followsUserLocation, setFollowUserLocation] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<Region | undefined>(undefined);
  const { bottom } = useSafeAreaInsets();
  const [selectedRoute, setSelectedRoute] = useState<Route | undefined>(undefined);
  const { top } = useSafeAreaInsets();
  const { mutateAsync } = useGoogleRoutes();
  const [currentTravelMode, setCurrentTravelMode] = useState('DRIVE');

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const region: Region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setCurrentLocation(region);
      setInitialRegion(region);
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (followsUserLocation && currentLocation) {
      mapRef.current?.animateToRegion(currentLocation);
    }
  }, [followsUserLocation, currentLocation]);

  useEffect(() => {
    setSelectedRoute(getSavedData());
  }, []);

  const updateRoute = async (newLocation: Region) => {
    if (!selectedPlace || !newLocation) return;

    try {
      const body = {
        destination: {
          location: {
            latLng: {
              latitude: selectedPlace.latitude,
              longitude: selectedPlace.longitude,
            },
          },
        },
        origin: {
          location: {
            latLng: {
              latitude: newLocation.latitude,
              longitude: newLocation.longitude,
            },
          },
        },
        travelMode: currentTravelMode,
      };

      const response = await mutateAsync(body);
      if (response?.data?.routes?.[0]) {
        setSelectedRoute(response.data.routes[0]);
      }
    } catch (err) {
      console.error('Error updating route:', err);
    }
  };

  const handleUserCoords = async (event: UserLocationChangeEvent) => {
    const latitude = event.nativeEvent.coordinate?.latitude;
    const longitude = event.nativeEvent.coordinate?.longitude;

    if (latitude === undefined || longitude === undefined) return;

    const newLocation: Region = {
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    };

    if (followsUserLocation) {
      mapRef.current?.animateToRegion(newLocation);
    }

    setCurrentLocation(newLocation);

    if (selectedPlace) {
      await updateRoute(newLocation);
    }
  };

  const handleFollowUser = () => {
    setFollowUserLocation(prev => !prev);
  };

  const handlePlaceSelect = async (
    place: {
      latitude: number;
      longitude: number;
      name: string;
    },
    travelMode: string
  ) => {
    try {
      const newRegion: Region = {
        latitude: place.latitude,
        longitude: place.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      };
      setSelectedPlace(newRegion);
      setCurrentTravelMode(travelMode);
      setFollowUserLocation(false);

      if (!currentLocation) return;

      const body = {
        destination: {
          location: {
            latLng: {
              latitude: place.latitude,
              longitude: place.longitude,
            },
          },
        },
        origin: {
          location: {
            latLng: {
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            },
          },
        },
        travelMode: travelMode,
      };

      const response = await mutateAsync(body);
      if (response?.data?.routes?.[0]) {
        setSelectedRoute(response.data.routes[0]);
      }
    } catch (err) {
      console.error('Error fetching route:', err);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <View style={{ flex: 1 }}>
        <View style={[styles.topContainer, { top }]}>
          <SearchBar onPlaceSelect={handlePlaceSelect} />
        </View>

        <MapView
          userLocationUpdateInterval={5000}
          ref={mapRef}
          showsBuildings={false}
          showsIndoors={false}
          provider="google"
          onUserLocationChange={handleUserCoords}
          showsUserLocation
          style={styles.map}
          initialRegion={initialRegion}
        >
          {selectedRoute && (
            <MapRoute route={selectedRoute} index={0} handlePress={() => {}} isActive={true} />
          )}
          {selectedPlace && (
            <Marker
              coordinate={{
                latitude: selectedPlace.latitude,
                longitude: selectedPlace.longitude,
              }}
            >
              <Ionicons name="location" size={24} color="black" />
            </Marker>
          )}
        </MapView>

        {
          <View style={[styles.bottomContainer, { bottom }]}>
            <View>
              {selectedRoute?.duration && selectedRoute?.distanceMeters && (
                <DistanceDisplay
                  time={selectedRoute.duration}
                  distance={selectedRoute.distanceMeters?.toString()}
                />
              )}
              <TouchableOpacity style={[styles.locationButton]} onPress={handleFollowUser}>
                <Ionicons
                  name={followsUserLocation ? 'navigate' : 'navigate-outline'}
                  size={24}
                  color="black"
                  style={{ flex: 0 }}
                />
              </TouchableOpacity>
            </View>
            {selectedRoute?.distanceMeters && (
              <RouteInstructions steps={selectedRoute.legs[0].steps} />
            )}
          </View>
        }
      </View>
    </KeyboardAvoidingView>
  );
};

export default Main;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  topContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    gap: 10,
    paddingHorizontal: 16,
  },
  locationButton: {
    position: 'absolute',
    right: 20,
    bottom: 0,
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
