import { calculateBearing } from '@/utils/iconhelpers';
import { navigationIcons } from '@/utils/navigationIcons';
import { Ionicons } from '@expo/vector-icons';
import { Marker } from 'react-native-maps';

// ! Not finished
const StepIcon = ({ step }) => {
  const firstStep = step;
  const bearing = calculateBearing(
    firstStep.startLocation.latLng,
    firstStep.endLocation.latLng,
    firstStep.navigationInstruction.maneuver
  );
  const iconName = navigationIcons[step.navigationInstruction.maneuver];

  return (
    <Marker
      flat
      rotation={bearing}
      key={step.distanceMeters}
      coordinate={step.startLocation.latLng}
    >
      <Ionicons color={'red'} name={iconName} size={24} />
    </Marker>
  );
};

export default StepIcon;
