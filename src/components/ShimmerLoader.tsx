import React from 'react';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

interface ShimmerLoaderProps {
  height?: number;
  width?: number | string;
  color?: string;
}

const ShimmerLoader: React.FC<ShimmerLoaderProps> = () => {
  return (
    <ShimmerPlaceholder
      style={{ width: '100%', height: '100%' }}
      // shimmerColors={['#FFBDBA', '#FF9C6D', '#FFBDBA']}
      location={[0.3, 0.5, 0.7]}
      shimmerWidthPercent={20}
    />
  );
};

export default ShimmerLoader;
