import { formatTime } from '@/utils/formatTime';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface DistanceDisplayProps {
  distance: string;
  time: string;
}

const DistanceDisplay = ({ distance, time }: DistanceDisplayProps) => {
  const formattedTime = formatTime(time);
  return (
    <View style={[styles.container]}>
      <Text style={styles.text}>
        {distance} meters & {formattedTime}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 6,
    borderRadius: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DistanceDisplay;
