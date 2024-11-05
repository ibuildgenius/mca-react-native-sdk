// components/GenericDialog.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from '../components/CustomButton'; // Assuming you have a CustomButton component
import { SvgUri } from 'react-native-svg';

interface SimplePopupProps {
  isVisible: boolean;
  onClose: () => void;
  policyNumber: string;
  onOkPressed?: () => void;
}

const SimplePopup: React.FC<SimplePopupProps> = ({
  isVisible,
  onClose,
  policyNumber,
  onOkPressed,
}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.dialogContainer}>
        <SvgUri uri="path_to_your_svg_icon" width={50} height={50} />
        <Text style={styles.title}>Ongoing Claim</Text>
        <Text style={styles.content}>
          There is currently an ongoing claim on this policy ({policyNumber}).
          Would you like to proceed to track the claim?
        </Text>
        <View style={styles.buttonRow}>
          <CustomButton
            title="No, Close"
            buttonColor="#ccc"
            textColor="#333"
            onPress={onClose}
          />
          <CustomButton
            title="Yes, Track Claim"
            onPress={onOkPressed ?? onClose}
          />
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
  },
});

export default SimplePopup;
