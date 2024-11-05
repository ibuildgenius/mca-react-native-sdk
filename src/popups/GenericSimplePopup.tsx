// components/GenericDialog.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from '../components/CustomButton'; // Assuming you have a CustomButton component
import { HorizontalSpacer, VerticalSpacer } from '../components/Spacer';
import { CustomColors } from '../constants/CustomColors';
import CautionIcon from '../assets/icons/caution_icon.svg';
import CloseIcon from '../assets/icons/round_caution_icon.svg';
import RoundQuestionIcon from '../assets/icons/round_question_icon.svg';
import { RegularText, SemiBoldText } from '../components/CustomText';

interface GenericSimplePopupProps {
  isVisible: boolean;
  isLoading?: boolean;
  title: string;
  content: string;
  contentBody?: React.ReactNode;
  okText?: string;
  cancelText?: string;
  showCloseIcon?: boolean;
  showQuestionIcon?: boolean;
  okButtonColor?: string;
  onClose: () => void;
  policyNumber: string;
  onOkPressed?: () => void;
}

const GenericSimplePopup: React.FC<GenericSimplePopupProps> = ({
  isVisible,
  isLoading = false,
  showCloseIcon = false,
  showQuestionIcon = false,
  title,
  content,
  contentBody,
  okText,
  cancelText,
  okButtonColor,
  onClose,
  onOkPressed,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      style={styles.modal}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View style={styles.dialogContainer}>
        {showCloseIcon ? (
          <CloseIcon width={60} height={60} />
        ) : showQuestionIcon ? (
          <CautionIcon width={60} height={60} />
        ) : (
          <RoundQuestionIcon width={60} height={60} />
        )}
        <VerticalSpacer height={15} />
        <SemiBoldText
          title={title}
          fontSize={19}
          color={CustomColors.blackColor}
          textAlign="left"
        />
        <VerticalSpacer height={20} />
        {contentBody ?? (
          <RegularText
            title={content}
            fontSize={16}
            color={CustomColors.formTitleColor}
            // textAlign="center"
          />
        )}
        <VerticalSpacer height={60} />

        <View style={styles.newButtonContainer}>
          <View style={styles.buttonWrapper}>
            <CustomButton
              title={cancelText ?? 'No, Close'}
              buttonColor={CustomColors.dividerGreyColor}
              textColor={CustomColors.backTextColor}
              onPress={onClose}
            />
          </View>
          <HorizontalSpacer width={10} />

          <View style={styles.buttonWrapper}>
            <CustomButton
              title={okText ?? 'Continue'}
              isLoading={isLoading}
              onPress={onOkPressed ?? onClose}
              buttonColor={okButtonColor}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%', // Set the width to 80% of the screen
    maxWidth: 400, // Optional: Set a max width for larger screens
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  content: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  newButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingHorizontal: 35,
  },
  buttonWrapper: {
    flex: 1,
    // marginHorizontal: 5,
  },
});

export default GenericSimplePopup;
