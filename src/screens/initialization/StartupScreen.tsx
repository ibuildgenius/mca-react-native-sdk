import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Circle, Flow } from 'react-native-animated-spinkit';
import { DynamicColors } from '../../constants/CustomColors';
import { HorizontalSpacer } from '../../components/Spacer';
import { InitViewModel } from './InitViewModel';
import globalObject from '../../store/globalObject';
import { TransactionType } from '../../utils/enums';
import { SemiBoldText } from '../../components/CustomText';

// interface StartupScreenProps {
//   showLoadingText: boolean;
// }

const StartupScreen: React.FC = () => {
  const viewModel = InitViewModel();
  // const {showLoadingText} = route.params;
  // const miscGlobal = useMiscStore((state: any) => state);

  useEffect(() => {
    const initialise = async () => {
      if (globalObject.publicKey) {
        if (globalObject.transactionType == TransactionType.inspection) {
          await viewModel.initialiseInspectionSdk();
        } else if (globalObject.transactionType == TransactionType.claim) {
          await viewModel.initialiseClaimSdk();
        } else if (
          globalObject.transactionType == TransactionType.continuePurchase
        ) {
          await viewModel.initialiseContinuePurchaseSdk();
        } else {
          await viewModel.initialiseSdk();
        }
      }
    };

    initialise();
  }, [globalObject.publicKey, globalObject.reference]);

  return (
    <View style={styles.center}>
      <View style={styles.column}>
        <View style={styles.padding}>
          <Circle size={35} color={DynamicColors().primaryBrandColor} />
        </View>

        {/* {showLoadingText && ( */}

        <View style={styles.loadingTextContainer}>
          <SemiBoldText title="Welcome" fontSize={16} />
          <HorizontalSpacer width={10} />
          <Flow size={20} color="black" />
        </View>
        {/* // ) */}
        {/* } */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  padding: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  loadingTextContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StartupScreen;
