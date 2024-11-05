// @ts-nocheck
import { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomButton from '../../components/CustomButton';
import PoweredByFooter from '../../components/PoweredByFooter';
import CustomAppBar from '../../components/CustomAppBar';
import { useClaimStore } from 'store/claimStore';
import type { ClaimModel } from 'models/ClaimModel';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from 'utils/navigatorStackList';
import {
  type RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

interface UploadThirdPartyDocumentScreenProps {
  claim: ClaimModel;
}

type UploadThirdPartyDocumentScreenRouteProps = RouteProp<
  RootStackParamList,
  'UploadThirdPartyDocumentScreen'
>;

const UploadThirdPartyDocumentScreen: React.FC<
  UploadThirdPartyDocumentScreenProps
> = () => {
  const route = useRoute<UploadThirdPartyDocumentScreenRouteProps>();
  const { claim } = route.params;
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  const { submitClaimInspection, isLoading } = useClaimStore(); // Zustand store hook for submitting claim
  const [amount, setAmount] = useState('');
  const [part1, setPart1] = useState(null);
  const [part2, setPart2] = useState(null);
  const [part3, setPart3] = useState(null);
  const [part4, setPart4] = useState(null);

  const handleImagePick = async (setImage) => {
    const result = await launchImageLibrary({ mediaType: 'photo' });
    if (result.assets && result.assets.length > 0) {
      setImage(result.assets[0]);
    }
  };

  const handleSubmit = async () => {
    if (!part1 || !part2 || !part3 || !part4 || !amount) {
      Alert('All fields are required');
      return;
    }

    submitClaimInspection({
      partOne: part1,
      partTwo: part2,
      partThree: part3,
      partFour: part4,
      amount: parseInt(amount, 10),
    });

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CustomAppBar showBackButton onBackTap={navigation.goBack} />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Submit Your Claim</Text>

        {/* Vehicle Info */}
        <View style={styles.vehicleInfoContainer}>
          <Text style={styles.infoLabel}>Vehicle Name</Text>
          <Text style={styles.infoText}>
            {`${claim.policy?.meta.vehicle_make} ${claim.policy?.meta.vehicle_model} ${claim.policy?.meta.year_of_manufacture}`}
          </Text>
          <Text style={styles.infoLabel}>Plate Number</Text>
          <Text style={styles.infoText}>
            {claim.policy?.meta.registration_number}
          </Text>
          <Image
            source={require('../assets/carImage.png')}
            style={styles.carImage}
          />
        </View>

        {/* Claim Amount */}
        <TextInput
          style={styles.input}
          placeholder="Enter claim amount"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        {/* Image Pickers */}
        <TouchableOpacity
          onPress={() => handleImagePick(setPart1)}
          style={styles.imagePicker}
        >
          <Text>{part1 ? 'Image Selected' : 'Damage part one'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleImagePick(setPart2)}
          style={styles.imagePicker}
        >
          <Text>{part2 ? 'Image Selected' : 'Damage part two'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleImagePick(setPart3)}
          style={styles.imagePicker}
        >
          <Text>{part3 ? 'Image Selected' : 'Damage part three'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleImagePick(setPart4)}
          style={styles.imagePicker}
        >
          <Text>{part4 ? 'Image Selected' : 'Damage part four'}</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <CustomButton
          title="Continue"
          onPress={handleSubmit}
          isLoading={isLoading}
        />

        <PoweredByFooter />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  vehicleInfoContainer: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 13,
    color: '#999',
  },
  infoText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  carImage: {
    width: 60,
    height: 60,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  imagePicker: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default UploadThirdPartyDocumentScreen;
