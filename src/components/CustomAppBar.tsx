import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomColors } from '../constants/CustomColors';
// import BackIcon from '../assets/icons/chevron_left.svg';
import 'react-native-svg';
// import HelpIcon from '../assets/icons/help_icon.svg';
// import XMark from '../assets/icons/x_mark.svg';
import globalObject from '../store/globalObject';
import GenericSimplePopup from '../popups/GenericSimplePopup';
import { RegularText } from './CustomText';
import { VerticalSpacer } from './Spacer';
import ProviderUtils from '../utils/ProviderUtils';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../utils/navigatorStackList';
import GenericBottomSheet from '../bottom_sheets/GenericBottomSheet';
import HelpCenterWidget from './HelpCenterWidget';
import XMark from './XMark';

interface CustomAppBarProps {
  showLogo?: boolean;
  showHelp?: boolean;
  showBackButton?: boolean;
  helpText?: string;
  onBackTap?: () => void;
}

const CustomAppBar: React.FC<CustomAppBarProps> = ({
  showLogo = true,
  showHelp = false,
  showBackButton = true,
  helpText = 'Help',
  onBackTap,
}) => {
  // const navigation = useNavigation();

  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

  const navigation = useNavigation<NavigationProps>();

  const { width } = Dimensions.get('window'); // Get screen width
  const [isModalVisible, setModalVisible] = useState(false);

  const [isSimplePopupVisible, setSimplePopupVisible] = useState(false);

  return (
    <View style={[styles.appBar, { width }]}>
      {showBackButton && (
        <TouchableOpacity onPress={onBackTap} style={styles.backButton}>
          {/* <BackIcon width={25} height={25} /> */}
        </TouchableOpacity>
      )}

      {showLogo &&
        // <Image
        //   source={require('../assets/images/mycover_logo.png')}
        //   style={styles.logo}
        // />

        // Global.businessDetails?.logo == null ||
        // (Global.businessDetails == null ||
        //     Global.businessDetails?.isDefaultLogo == true ||
        //     Global.useDefaultColor == true)

        (globalObject.businessDetails?.logo == null ||
        globalObject.businessDetails?.isDefaultLogo == true ? (
          <Image
            source={require('../assets/images/mycover_logo.png')}
            style={styles.logo}
          />
        ) : (
          <Image
            source={{ uri: globalObject.businessDetails.logo }}
            style={styles.logo}
          />
        ))}

      <View style={styles.rowContainer}>
        {showHelp && (
          <TouchableOpacity
            onPress={() => {
              setModalVisible(true);
              /* Handle Help */
            }}
            style={styles.helpButton}
          >
            <View style={styles.rowContainer}>
              {/* <HelpIcon width={24} height={24} /> */}
              <View style={{ paddingRight: 5 }}></View>

              <Text style={styles.helpText}>{helpText}</Text>
            </View>
          </TouchableOpacity>
        )}
        {/* <View style={styles.rightContainer}></View> */}
        <TouchableOpacity
          onPress={() => {
            setSimplePopupVisible(true);
            // navigation.goBack();
          }}
          style={styles.closeButton}
        >
          {<XMark />}
        </TouchableOpacity>
      </View>
      {/* <View style={{paddingRight: 2}}></View> */}

      <GenericSimplePopup
        isVisible={isSimplePopupVisible}
        title="Exit Page"
        content="Before exiting this page, please be aware that proceeding will result in the loss of any previously submitted data. Are you sure you want to continue?"
        contentBody={
          <>
            <RegularText
              title={
                'Before exiting this page, please be aware that proceeding will result in the loss of any previously submitted data. Are you sure you want to continue?'
              }
              fontSize={16}
              color={CustomColors.formTitleColor}
              textAlign="center"
              lineHeight={22}
            />
            <VerticalSpacer height={20} />
          </>
        }
        okText="Yes, Exit page"
        cancelText="No, Go back"
        policyNumber="12345"
        showCloseIcon={true}
        okButtonColor={CustomColors.redExitColor}
        onClose={() => setSimplePopupVisible(false)}
        onOkPressed={() => {
          ProviderUtils.resetAllProviders();
          navigation.popToTop();
        }}
      />

      <GenericBottomSheet
        title="Help Center"
        isVisible={isModalVisible}
        content={<HelpCenterWidget />}
        modalHeight={600}
        onClose={() => setModalVisible(false)}
        showButtons={false}
        onOkPressed={() => {
          navigation.popToTop();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,

    height: 60,
  },
  rowContainer: {
    flexDirection: 'row',
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  backButton: {
    // padding: 10,
    backgroundColor: CustomColors.backBorderColor,
    width: 41, // Set width
    height: 41, // Set height equal to width
    borderRadius: 20, // Set borderRadius to half of width/height for a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
    // justifyContent: 'flex-end',
    // alignItems: 'flex-end',
    // alignSelf: 'flex-end',
  },
  closeButton: {
    // padding: 10,
    backgroundColor: CustomColors.backBorderColor,
    width: 41, // Set width
    height: 41, // Set height equal to width
    borderRadius: 20, // Set borderRadius to half of width/height for a perfect circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  logo: {
    height: 25,
    width: 105,
    resizeMode: 'contain',
  },
  helpButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: CustomColors.backBorderColor,

    borderRadius: 24,
  },
  helpText: {
    fontSize: 15,
    color: CustomColors.blackTextColor,
  },
});

export default CustomAppBar;

// export default XMark;
