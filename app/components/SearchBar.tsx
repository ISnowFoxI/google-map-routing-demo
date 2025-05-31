import { useGoogleAutoComplete } from '@/hooks/queries/useGoogleAutoComplete';
import { useGoogleGeocoding } from '@/hooks/queries/useGoogleGeocoding';
import { GooglePlaceDetails } from '@/types/location';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const travelModes = ['WALK', 'DRIVE', 'BICYCLE', 'TWO_WHEELER', 'TRANSIT'];

interface GooglePlacePrediction {
  description: string;
  place_id: string;
}

interface SearchBarProps {
  onPlaceSelect: (
    place: {
      latitude: number;
      longitude: number;
      name: string;
    },
    travelMode: string
  ) => void;
}

const SearchBar = ({ onPlaceSelect }: SearchBarProps) => {
  const [searchText, setSearchText] = useState('');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [selectedTravelMode, setSelectedTravelMode] = useState('DRIVE');
  const [isFocused, setIsFocused] = useState(false);

  const { data: predictions, isLoading } = useGoogleAutoComplete(searchText, searchText.length > 2);

  const { data: placeDetails } = useGoogleGeocoding(selectedPlaceId || '', !!selectedPlaceId);

  React.useEffect(() => {
    const details = placeDetails?.data as GooglePlaceDetails;
    if (details?.result?.geometry?.location) {
      const { lat, lng } = details.result.geometry.location;
      onPlaceSelect(
        {
          latitude: lat,
          longitude: lng,
          name: details.result.formatted_address,
        },
        selectedTravelMode
      );
      setSearchText('');
      setSelectedPlaceId(null);
    }
  }, [placeDetails, onPlaceSelect, selectedTravelMode]);

  const handlePlaceSelect = (placeId: string) => {
    setSelectedPlaceId(placeId);
  };

  const predictionsList = (predictions?.data?.predictions || []) as GooglePlacePrediction[];

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const handleClear = () => {
    setSearchText('');
  };

  const renderPredictionItem = ({ item }: { item: GooglePlacePrediction }) => (
    <TouchableOpacity style={styles.resultItem} onPress={() => handlePlaceSelect(item.place_id)}>
      <Ionicons name="location-outline" size={20} color="#666" style={styles.resultIcon} />
      <View style={styles.resultTextContainer}>
        <Text style={styles.resultTitle} numberOfLines={1}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search for a place"
          value={searchText}
          onChangeText={handleSearch}
          onFocus={() => setIsFocused(true)}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {isFocused && searchText.length > 0 && (
        <View style={styles.resultsContainer}>
          <View style={styles.travelModesContainer}>
            {travelModes.map(mode => (
              <TouchableOpacity
                key={mode}
                style={[
                  styles.travelModeButton,
                  selectedTravelMode === mode && styles.selectedTravelMode,
                ]}
                onPress={() => setSelectedTravelMode(mode)}
              >
                <Text
                  style={[
                    styles.travelModeText,
                    selectedTravelMode === mode && styles.selectedTravelModeText,
                  ]}
                >
                  {mode}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color="#007AFF" />
            </View>
          ) : (
            <FlatList
              data={predictionsList}
              renderItem={renderPredictionItem}
              keyExtractor={item => item.place_id}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              style={styles.resultsList}
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    height: 48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  resultsContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 8,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingContainer: {
    padding: 16,
    alignItems: 'center',
  },
  resultsList: {
    maxHeight: 300,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resultIcon: {
    marginRight: 12,
  },
  resultTextContainer: {
    flex: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  travelModesContainer: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    flexWrap: 'wrap',
    gap: 8,
  },
  travelModeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  },
  selectedTravelMode: {
    backgroundColor: '#007AFF',
  },
  travelModeText: {
    fontSize: 12,
    color: '#333',
  },
  selectedTravelModeText: {
    color: 'white',
  },
});

export default SearchBar;
