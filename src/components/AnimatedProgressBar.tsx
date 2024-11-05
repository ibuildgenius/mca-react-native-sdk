import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

const { width: screenWidth } = Dimensions.get('window');

const AnimatedProgressBar: React.FC = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: screenWidth - 200, // Moving bar length and screen width calculation
            duration: 2000, // Animation duration
            useNativeDriver: false,
          }),
          Animated.timing(animatedValue, {
            toValue: 0, // Move back to the start
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ).start();
    };

    animate();

    return () => {
      animatedValue.stopAnimation();
    };
  }, [animatedValue]);

  return (
    <View style={styles.progressBarBackground}>
      <Animated.View
        style={[
          styles.movingBar,
          { transform: [{ translateX: animatedValue }] },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarBackground: {
    height: 7,
    width: '100%',
    backgroundColor: '#E0E0E0', // Equivalent to CustomColors.discountBgColor
    borderRadius: 5,
    overflow: 'hidden',
  },
  movingBar: {
    height: 7,
    width: 80, // Width of the moving bar
    backgroundColor: '#00C853', // Equivalent to CustomColors.progressGreenColor
    borderRadius: 5,
  },
});

export default AnimatedProgressBar;
