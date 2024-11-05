import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modal';
import { SemiBoldText } from '../components/CustomText';
import XMark from '../assets/icons/x_mark.svg';
import { VerticalSpacer } from '../components/Spacer';
import CustomButton from '../components/CustomButton';
import { CustomColors } from '../constants/CustomColors';
// import XMark from 'components/XMark';

interface GenericBottomSheetProps {
  isVisible: boolean;
  isLoading?: boolean;
  modalHeight?: number;
  showButtons?: boolean;
  buttonColor?: string;
  title: string;
  okText?: string;
  content: React.ReactNode;
  onClose: () => void;
  onOkPressed?: () => void;
  // loadStore: LoadStore;
}

const { height } = Dimensions.get('window');

export const GenericBottomSheet: React.FC<GenericBottomSheetProps> = ({
  isVisible,
  isLoading,
  modalHeight = 300,

  showButtons = true,
  buttonColor,

  title,
  okText,
  content,
  onClose,
  onOkPressed,
  // loadStore,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modal}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <SemiBoldText title={title} fontSize={17} />
          <TouchableOpacity onPress={onClose}>
            <XMark />
            {/* <Text style={styles.closeButton}>X</Text> */}
          </TouchableOpacity>
        </View>

        <VerticalSpacer height={10} />

        <ScrollView
          showsVerticalScrollIndicator={false} // This will hide the vertical scroll bar
          showsHorizontalScrollIndicator={false} // This will hide the horizontal scroll bar if applicable
          style={[styles.keyBenefits, { maxHeight: modalHeight }]}
        >
          {content}
        </ScrollView>

        {!showButtons ? (
          <></>
        ) : (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.goBackButton} onPress={onClose}>
              <CustomButton
                title="Go Back"
                onPress={onClose}
                textColor={CustomColors.backTextColor}
                buttonColor={CustomColors.dividerGreyColor}
                fontSize={15}
              />
            </TouchableOpacity>
            <View style={styles.continueButton}>
              <CustomButton
                title={okText ?? 'Continue'}
                onPress={onOkPressed}
                buttonColor={buttonColor}
                isLoading={isLoading}
              />
              {/* <Text style={styles.buttonText}>Continue</Text> */}
            </View>
            {/* <CustomButton
            title="Continue"
            onPress={onContinue}
          /> */}
          </View>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  container: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 20,
    paddingTop: 25,
    maxHeight: height * 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    fontSize: 18,
    color: '#000',
  },
  productDetailsContainer: {
    marginBottom: 20,
  },
  keyBenefits: {
    minHeight: 50, // You can set a minimum height
    maxHeight: 300, // Set the maximum height
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  goBackButton: {
    flex: 1,
    marginRight: 10,
  },
  continueButton: {
    flex: 2,
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default GenericBottomSheet;
