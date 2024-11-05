import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { DynamicColors } from '../../../constants/CustomColors';

interface CaptureSideContainerProps {
  onTap?: () => void;
  isLoading: boolean;
}

const CaptureSideContainer: React.FC<CaptureSideContainerProps> = ({
  onTap,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={isLoading ? undefined : onTap}
      activeOpacity={isLoading ? 1 : 0.7} // Disable interaction if loading
      style={[styles.container, { backgroundColor: 'transparent' }]}
    >
      <View style={styles.innerContainer}>
        <View style={[styles.outerCircle]}>
          <View
            style={[
              styles.innerCircle,
              {
                backgroundColor: isLoading
                  ? DynamicColors().primaryBrandColor
                  : '#FFFFFF', // Replace with your primary brand color
              },
            ]}
          >
            {/* {isLoading && (
              <ActivityIndicator size="small" color="#FFFFFF" /> // Add loading indicator
            )} */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingRight: 1,
  },
  innerContainer: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerCircle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: '#FFFFFF', // Replace with your white color
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CaptureSideContainer;
