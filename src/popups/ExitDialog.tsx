// components/ExitDialog.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from '../components/CustomButton';

interface ExitDialogProps {
  isVisible: boolean;
  onClose: () => void;
  onOkPressed?: () => void;
}

const ExitDialog: React.FC<ExitDialogProps> = ({
  isVisible,
  onClose,
  onOkPressed,
}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.dialogContainer}>
        <Text style={styles.title}>Exit Page</Text>
        <Text style={styles.content}>
          Before exiting this page, please be aware that proceeding will result
          in the loss of any previously submitted data. Are you sure you want to
          continue?
        </Text>
        <View style={styles.buttonRow}>
          <CustomButton
            title="No, Go back"
            buttonColor="#ccc"
            textColor="#333"
            onPress={onClose}
          />
          <CustomButton
            title="Yes, Exit page"
            buttonColor="red"
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

export default ExitDialog;
