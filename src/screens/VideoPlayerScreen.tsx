// import { RouteProp, useRoute } from '@react-navigation/native';
// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import Video from 'react-native-video';
// import { RootStackParamList } from '../utils/navigatorStackList';

// interface VideoPlayerScreenProps {
//   videoUri: string; // Adjust this according to the actual file structure in React Native
// }

// type VideoPlayerScreenRouteProps = RouteProp<
//   RootStackParamList,
//   'VideoPlayerScreen'
// >;

// const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = () => {
//   const route = useRoute<VideoPlayerScreenRouteProps>();
//   const { videoUri } = route.params;

//   return (
//     <View style={styles.container}>
//       <Video
//         source={{ uri: videoUri }} // The video URI passed from navigation
//         style={styles.videoPlayer}
//         controls={true} // Show video controls (play, pause, etc.)
//         resizeMode="contain" // Adjust video size to fit screen
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#000',
//   },
//   videoPlayer: {
//     width: '100%',
//     height: '100%',
//   },
// });

// export default VideoPlayerScreen;
