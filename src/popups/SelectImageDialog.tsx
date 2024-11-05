// components/SelectImageDialog.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import CustomButton from '../components/CustomButton';

interface SelectImageDialogProps {
  isVisible: boolean;
  onClose: () => void;
  onCameraPressed?: () => void;
  onGalleryPressed?: () => void;
}

const SelectImageDialog: React.FC<SelectImageDialogProps> = ({
  isVisible,
  onClose,
  onCameraPressed,
  onGalleryPressed,
}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.modal}>
      <View style={styles.dialogContainer}>
        <View style={styles.row}>
          <TouchableOpacity onPress={onCameraPressed}>
            <Text style={styles.optionText}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onGalleryPressed}>
            <Text style={styles.optionText}>Gallery</Text>
          </TouchableOpacity>
        </View>
        <CustomButton title="Close" onPress={onClose} />
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  optionText: {
    fontSize: 18,
    color: 'blue',
    marginHorizontal: 15,
  },
});

export default SelectImageDialog;
