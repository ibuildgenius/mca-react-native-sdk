import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { CustomColors } from '../../../constants/CustomColors';
import NewCheckIcon from '../../../assets/icons/new_check_icon.svg';

import { InspectionType } from '../../../utils/enums';

interface StepIndicatorProps {
  inspectionType: InspectionType;
  verificationStep: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  inspectionType,
  verificationStep,
}) => {
  const steps =
    inspectionType == InspectionType.gadget
      ? Array(4).fill(null)
      : Array(7).fill(null); // Representing 7 steps

  return (
    <View style={styles.paddingContainer}>
      <View style={styles.stepsContainer}>
        <FlatList
          data={steps}
          renderItem={({ index }) => {
            const isStepCompleted = index < verificationStep;
            return (
              <View style={styles.stepItem}>
                <View
                  style={[
                    styles.circle,
                    {
                      backgroundColor: isStepCompleted
                        ? CustomColors.success500Color
                        : CustomColors.grayiconColor,
                    },
                  ]}
                >
                  <NewCheckIcon
                    width={22}
                    height={22}
                    fill={
                      // isStepCompleted
                      //   ? CustomColors.success500Color
                      //   :
                      CustomColors.whiteColor
                    }
                  />
                </View>
              </View>
            );
          }}
          keyExtractor={(_item, index) => index.toString()}
          scrollEnabled={false} // Disable scroll
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  paddingContainer: {
    paddingLeft: 10,
    paddingTop: 10,
  },
  stepsContainer: {
    width: 30,
    backgroundColor: CustomColors.transGray100Color,
    borderRadius: 20,
    paddingVertical: 8,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  stepItem: {
    marginBottom: 12,
  },
  circle: {
    height: 21,
    width: 21,
    borderRadius: 10.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StepIndicator;
