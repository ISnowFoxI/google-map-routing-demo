interface Coordinate {
  latitude: number;
  longitude: number;
}

export const calculateBearing = (start: Coordinate, end: Coordinate, maneuver?: string): number => {
  const startLat = toRadians(start.latitude);
  const startLng = toRadians(start.longitude);
  const endLat = toRadians(end.latitude);
  const endLng = toRadians(end.longitude);

  const y = Math.sin(endLng - startLng) * Math.cos(endLat);
  const x =
    Math.cos(startLat) * Math.sin(endLat) -
    Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng);

  let bearing = toDegrees(Math.atan2(y, x));

  // Normalize to 0-360
  bearing = (bearing + 360) % 360;

  // Adjust bearing based on maneuver type
  if (maneuver) {
    switch (maneuver) {
      case 'TURN_LEFT':
      case 'TURN_SHARP_LEFT':
        bearing -= 90;
        break;
      case 'TURN_RIGHT':
      case 'TURN_SHARP_RIGHT':
        bearing += 90;
        break;
      case 'UTURN_LEFT':
        bearing -= 180;
        break;
      case 'UTURN_RIGHT':
        bearing += 180;
        break;
      // Add other cases as needed
    }
    // Normalize again after adjustment
    bearing = (bearing + 360) % 360;
  }

  return bearing;
};

const toRadians = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

const toDegrees = (radians: number): number => {
  return radians * (180 / Math.PI);
};
