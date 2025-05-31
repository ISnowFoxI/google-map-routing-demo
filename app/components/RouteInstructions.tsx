import { RouteInstructionsProps } from '@/types/route';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface RouteStep {
  navigationInstruction: {
    instructions: string;
  };
}

const _springConfig = {
  damping: 7,
  stiffness: 20,
};

const RouteInstructions = ({ steps }: RouteInstructionsProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animation = useSharedValue(0);
  const toggleInstructions = () => {
    if (isExpanded) {
      animation.value = withSpring(0, _springConfig);
    } else {
      animation.value = withSpring(1, _springConfig);
    }
    setIsExpanded(!isExpanded);
  };

  const animatedStyle = useAnimatedStyle(() => {
    const maxHeight = interpolate(animation.value, [0, 1], [0, 300]);

    return {
      maxHeight,
    };
  });

  const renderStep = ({ item, index }: { item: RouteStep; index: number }) => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepNumber}>{index + 1}</Text>
      <Text style={styles.instructionText}>{item.navigationInstruction.instructions}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={toggleInstructions}>
        <Text style={styles.headerText}>Route Instructions</Text>
        <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={24} color="black" />
      </TouchableOpacity>
      <Animated.View style={[styles.content, animatedStyle]}>
        <FlatList
          data={steps}
          renderItem={renderStep}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
  },
  content: {
    overflow: 'hidden',
  },
  listContent: {
    padding: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#007AFF',
    color: 'white',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
    fontSize: 12,
    fontWeight: '600',
  },
  instructionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});

export default RouteInstructions;
