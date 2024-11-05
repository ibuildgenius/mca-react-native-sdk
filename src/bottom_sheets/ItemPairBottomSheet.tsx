// import React from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Modal,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import {useForm, Control} from 'react-hook-form';
// import BuildFormFieldWidget from '../screens/purchase/form/components/BuildFormFieldWidget';
// import CustomButton from '../components/CustomButton';
// import {FormStore, useFormStore} from '../store/formStore';

// interface ItemPairBottomSheetProps {
//   isVisible: boolean;
//   onClose: () => void;
//   fields: any[]; // List of form fields to render
//   productDetails: any;
// }

// const ItemPairBottomSheet: React.FC<ItemPairBottomSheetProps> = ({
//   isVisible,
//   onClose,
//   fields,
//   productDetails,
// }) => {
//   const {control, handleSubmit} = useForm();
//   const globalForm = useFormStore((state: FormStore) => state);

//   const onSubmit = (data: any) => {
//     onClose();
//   };

//   return (
//     <Modal
//       animationType="none" // No animation
//       transparent={true}
//       visible={isVisible}
//       onRequestClose={onClose}>
//       <View style={styles.overlay}>
//         <View style={styles.bottomSheet}>
//           <Text style={styles.title}>Add Item</Text>

//           {/* Render each field using BuildFormFieldWidget */}
//           <FlatList
//             data={fields}
//             keyExtractor={item => item.name}
//             renderItem={({item}) => (
//               <BuildFormFieldWidget
//                 field={item}
//                 control={control as Control<any>}
//                 globalForm={globalForm}
//                 filteredFieldsLength={fields.length}
//                 isLastPage={true}
//                 productDetails={productDetails}
//                 handleSubmit={handleSubmit}
//                 onClearFocus={() => {}}
//               />
//             )}
//           />

//           {/* Action Button */}
//           <CustomButton title="Submit" onPress={handleSubmit(onSubmit)} />

//           {/* Close Button */}
//           <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//             <Text style={styles.closeText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
//   },
//   bottomSheet: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//     maxHeight: '80%', // limit the height if there are too many items
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   closeButton: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   closeText: {
//     fontSize: 16,
//     color: 'blue',
//   },
// });

// export default ItemPairBottomSheet;

// components/ItemPairBottomSheet.tsx

// import React from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Modal,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';
// import {useForm, Control} from 'react-hook-form';
// import BuildFormFieldWidget from '../screens/purchase/form/components/BuildFormFieldWidget';
// import CustomButton from '../components/CustomButton';
// import {FormStore, useFormStore} from '../store/formStore';

// interface ItemPairBottomSheetProps {
//   isVisible: boolean;
//   onClose: () => void;
//   fields: any[]; // List of form fields to render
//   productDetails: any;
// }

// const ItemPairBottomSheet: React.FC<ItemPairBottomSheetProps> = ({
//   isVisible,
//   onClose,
//   fields,
//   productDetails,
// }) => {
//   const {control, handleSubmit} = useForm();
//   const globalForm = useFormStore((state: FormStore) => state);

//   const onSubmit = (data: any) => {
//     onClose();
//   };

//   return (
//     <Modal
//       animationType="slide" // Slide-in animation
//       transparent={true}
//       visible={isVisible}
//       onRequestClose={onClose}>
//       <View style={styles.overlay}>
//         <View style={styles.bottomSheet}>
//           <Text style={styles.title}>Add Item</Text>

//           {/* Render each field using BuildFormFieldWidget */}
//           <FlatList
//             data={fields}
//             keyExtractor={item => item.name}
//             renderItem={({item}) => (
//               <BuildFormFieldWidget
//                 field={item}
//                 control={control as Control<any>}
//                 globalForm={globalForm}
//                 filteredFieldsLength={fields.length}
//                 isLastPage={true}
//                 productDetails={productDetails}
//                 handleSubmit={handleSubmit}
//                 onClearFocus={() => {}}
//               />
//             )}
//           />

//           {/* Action Button */}
//           <CustomButton title="Submit" onPress={handleSubmit(onSubmit)} />

//           {/* Close Button */}
//           <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//             <Text style={styles.closeText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
//   },
//   bottomSheet: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//     maxHeight: '80%', // limit the height if there are too many items
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   closeButton: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   closeText: {
//     fontSize: 16,
//     color: 'blue',
//   },
// });

// export default ItemPairBottomSheet;

// // components/ItemPairBottomSheet.tsx
// import React from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   Modal,
//   StyleSheet,
//   TouchableOpacity,
//   Animated,
// } from 'react-native';
// import {useForm, Control} from 'react-hook-form';
// import BuildFormFieldWidget from '../screens/purchase/form/components/BuildFormFieldWidget';
// import CustomButton from '../components/CustomButton';
// import {FormStore, useFormStore} from '../store/formStore';

// interface ItemPairBottomSheetProps {
//   isVisible: boolean;
//   onClose: () => void;
//   fields: any[]; // List of form fields to render
//   productDetails: any;
// }

// const ItemPairBottomSheet: React.FC<ItemPairBottomSheetProps> = ({
//   isVisible,
//   onClose,
//   fields,
//   productDetails,
// }) => {
//   const {control, handleSubmit} = useForm();
//   const globalForm = useFormStore((state: FormStore) => state);

//   const slideAnim = React.useRef(new Animated.Value(300)).current; // Initial position (off-screen)

//   React.useEffect(() => {
//     if (isVisible) {
//       // Slide up
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     } else {
//       // Slide down
//       Animated.timing(slideAnim, {
//         toValue: 300,
//         duration: 300,
//         useNativeDriver: true,
//       }).start();
//     }
//   }, [isVisible]);

//   const onSubmit = (data: any) => {
//     onClose();
//   };

//   return (
//     <Modal transparent={true} visible={isVisible} onRequestClose={onClose}>
//       {/* Fixed Background Overlay */}
//       <TouchableOpacity
//         style={styles.overlay}
//         activeOpacity={1}
//         onPress={onClose}
//       />

//       {/* Animated Bottom Sheet */}
//       <Animated.View
//         style={[styles.bottomSheet, {transform: [{translateY: slideAnim}]}]}>
//         <Text style={styles.title}>Add Item</Text>

//         {/* Render each field using BuildFormFieldWidget */}
//         <FlatList
//           data={fields}
//           keyExtractor={item => item.name}
//           renderItem={({item}) => (
//             <BuildFormFieldWidget
//               field={item}
//               control={control as Control<any>}
//               globalForm={globalForm}
//               filteredFieldsLength={fields.length}
//               isLastPage={true}
//               productDetails={productDetails}
//               handleSubmit={handleSubmit}
//               onClearFocus={() => {}}
//             />
//           )}
//         />

//         {/* Action Button */}
//         <CustomButton title="Submit" onPress={handleSubmit(onSubmit)} />

//         {/* Close Button */}
//         <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//           <Text style={styles.closeText}>Close</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fixed semi-transparent background
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
//   bottomSheet: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: 'white',
//     padding: 20,
//     borderTopLeftRadius: 15,
//     borderTopRightRadius: 15,
//     maxHeight: '80%', // Limit height
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   closeButton: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   closeText: {
//     fontSize: 16,
//     color: 'blue',
//   },
// });

// export default ItemPairBottomSheet;

// components/ItemPairBottomSheet.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useForm, type Control } from 'react-hook-form';

import BuildFormFieldWidget from '../screens/purchase/form/components/BuildFormFieldWidget';
import CustomButton from '../components/CustomButton';
import { type FormStore, useFormStore } from '../store/formStore';

interface ItemPairBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  fields: any[]; // List of form fields to render
  productDetails: any;
}

const ItemPairBottomSheet: React.FC<ItemPairBottomSheetProps> = ({
  isVisible,
  onClose,
  fields,
  productDetails,
}) => {
  const { control, handleSubmit, trigger } = useForm();

  const globalForm = useFormStore((state: FormStore) => state);

  const slideAnim = React.useRef(new Animated.Value(300)).current;

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible]);

  const onSubmit = () => {
    onClose();
  };

  return (
    <Modal transparent={true} visible={isVisible} onRequestClose={onClose}>
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      />

      <Animated.View
        style={[styles.bottomSheet, { transform: [{ translateY: slideAnim }] }]}
      >
        <Text style={styles.title}>Add Item</Text>

        {/* Render first two fields side-by-side, then others in a list */}
        <View style={styles.rowContainer}>
          {fields.slice(0, 2).map((item) => (
            <View key={item.name} style={styles.halfWidth}>
              <BuildFormFieldWidget
                field={item}
                control={control as Control<any>}
                globalForm={globalForm}
                filteredFieldsLength={fields.length}
                isLastPage={true}
                productDetails={productDetails}
                handleSubmit={handleSubmit}
                trigger={trigger}
                // onClearFocus={() => {}}
              />
            </View>
          ))}
        </View>

        {/* Render remaining fields in a vertical list */}
        <FlatList
          data={fields.slice(2)}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <BuildFormFieldWidget
              field={item}
              control={control as Control<any>}
              globalForm={globalForm}
              filteredFieldsLength={fields.length}
              isLastPage={true}
              productDetails={productDetails}
              handleSubmit={handleSubmit}
              trigger={trigger}
              // onClearFocus={() => {}}
            />
          )}
        />

        <CustomButton title="Submit" onPress={handleSubmit(onSubmit)} />

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>Close</Text>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    maxHeight: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  halfWidth: {
    width: '48%',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: 'blue',
  },
});

export default ItemPairBottomSheet;
