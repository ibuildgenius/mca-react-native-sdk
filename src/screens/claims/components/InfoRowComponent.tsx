import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RegularText, SemiBoldText } from '../../../components/CustomText';
import { CustomColors } from '../../../constants/CustomColors';
import { VerticalSpacer } from '../../../components/Spacer';

// Define prop types for the component
interface InfoRowProps {
  title1: string;
  subtitle1: string;
  title2: string;
  subtitle2: string;
  fontSize?: number;
  color?: string;
}

const InfoRowComponent: React.FC<InfoRowProps> = ({
  title1,
  subtitle1,
  title2,
  subtitle2,
  fontSize = 15,
  color = CustomColors.blackTextColor,
}) => {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoColumn}>
        <RegularText
          title={title1}
          fontSize={fontSize}
          color={CustomColors.greyTextColor}
        />

        <VerticalSpacer height={4} />
        <SemiBoldText
          title={subtitle1}
          fontSize={fontSize + 0.5}
          color={color}
        />
      </View>
      <View style={styles.infoRightColumn}>
        <RegularText
          title={title2}
          fontSize={fontSize}
          color={CustomColors.greyTextColor}
        />

        <VerticalSpacer height={4} />
        <SemiBoldText
          title={subtitle2}
          fontSize={fontSize + 0.5}
          color={color}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  infoColumn: {
    flex: 1,
  },
  infoRightColumn: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default InfoRowComponent;
