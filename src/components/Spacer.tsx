import React from 'react';
import { View } from 'react-native';

// Vertical Spacer Component
export const VerticalSpacer: React.FC<{ height: number }> = ({ height }) => {
  return <View style={{ height }} />;
};

// Horizontal Spacer Component
export const HorizontalSpacer: React.FC<{ width: number }> = ({ width }) => {
  return <View style={{ width }} />;
};
