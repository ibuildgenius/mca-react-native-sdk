// // import React, {useState, useEffect, useRef} from 'react';
// // import {
// //   View,
// //   Text,
// //   Button,
// //   StyleSheet,
// //   TouchableOpacity,
// //   Alert,
// // } from 'react-native';
// // import {
// //   Camera,
// //   CameraDeviceFormat,
// //   useCameraDevice,
// //   useCameraDevices,
// // } from 'react-native-vision-camera';
// // import {useIsFocused} from '@react-navigation/native';
// // import RNFS from 'react-native-fs'; // To get file size
// // import {SemiBoldText} from '../components/CustomText';
// // import {CustomColors} from '../constants/CustomColors';
// // import {VerticalSpacer} from '../components/Spacer';
// // import {Video} from 'react-native-compressor';
// // import {FileData} from './purchase/form/components/CustomImagePicker';

// // const VideoRecorder = () => {
// //   const [isRecording, setIsRecording] = useState(false);
// //   const [videoPath, setVideoPath] = useState<string | null>(null);
// //   const [timer, setTimer] = useState(0); // Timer to track video length
// //   const [fileSize, setFileSize] = useState(0); // File size of the video
// //   const [fileSizeMB, setFileSizeMB] = useState(0); // File size of the video in MB
// //   const cameraRef = useRef<Camera>(null);
// //   const [compressedFileSizeMB, setCompressedFileSizeMB] = useState(0);
// //   const [compressionTime, setCompressionTime] = useState(0);
// //   const [compressedVideoPath, setCompressedVideoPath] = useState<string | null>(
// //     null,
// //   );
// //   const [lowResolutionFormat, setLowResolutionFormat] = useState<
// //     CameraDeviceFormat | undefined
// //   >();

// //   //   const devices = useCameraDevices();
// //   const device = useCameraDevice('back');
// //   const isFocused = useIsFocused();
// //   let interval: any;

// //   useEffect(() => {
// //     if (device) {
// //       // Filter formats for a low resolution option, such as 640x480 (VGA resolution)
// //       const lowRes = device.formats.find(
// //         format => format.videoWidth <= 640 && format.videoHeight <= 480,
// //       );
// //       setLowResolutionFormat(lowRes);
// //     }
// //   }, [device]);

// //   // Request camera permission
// //   useEffect(() => {
// //     const getCameraPermission = async () => {
// //       const status = await Camera.requestCameraPermission();
// //       //   if (status !== 'authorized') {
// //       //     Alert.alert('Camera permission is required to record video');
// //       //   }
// //     };

// //     getCameraPermission();

// //     // Clear timer interval on unmount
// //     return () => clearInterval(interval);
// //   }, []);

// //   // Timer function to track video length
// //   useEffect(() => {
// //     if (isRecording) {
// //       interval = setInterval(() => {
// //         setTimer(prev => prev + 1);
// //       }, 1000);
// //     } else {
// //       clearInterval(interval);
// //     }
// //     return () => clearInterval(interval);
// //   }, [isRecording]);

// //   const startRecording = async () => {
// //     if (cameraRef.current == null) return;

// //     try {
// //       setIsRecording(true);
// //       setTimer(0); // Reset the timer when starting recording

// //       await cameraRef.current.startRecording({
// //         fileType: 'mp4',
// //         videoBitRate: 'extra-low',
// //         onRecordingFinished: video => handleStopRecording(video),
// //         onRecordingError: error => console.error(error),
// //       });
// //     } catch (e) {
// //       console.error(e);
// //       setIsRecording(false);
// //     }
// //   };

// //   const handleStopRecording = async (video: {path: string}) => {
// //     setIsRecording(false);

// //     // Set video path
// //     setVideoPath(video.path);

// //     // Get video file size
// //     const stats = await RNFS.stat(video.path);
// //     setFileSize(Number(stats.size));

// //     const sizeInMB = Number(stats.size) / (1024 * 1024); // Convert bytes to MB
// //     setFileSizeMB(sizeInMB); // Store the raw number value in state

// //     console.log(`Original video size: ${sizeInMB} MB`);
// //     const newFileData: FileData = {
// //       uri: `file://${video.path}`,
// //       name: 'videoFile.name',
// //     };

// //     // Compress the video after stopping the recording
// //     const compressedVideoUri = await compressVideo(newFileData);

// //     if (compressedVideoUri) {
// //       setCompressedVideoPath(compressedVideoUri);

// //       // Get compressed video file size
// //       const compressedStats = await RNFS.stat(compressedVideoUri);
// //       const compressedSizeInMB = Number(compressedStats.size) / (1024 * 1024); // Convert bytes to MB
// //       setCompressedFileSizeMB(compressedSizeInMB);

// //       console.log(`Compressed video size: ${compressedSizeInMB} MB`);

// //       ////////////

// //       // console.log(`Video recorded at path: ${video.path}, size: ${sizeInMB} MB`);

// //       console.log(
// //         `Video recorded at path: ${video.path}, size: ${stats.size} bytes , size: ${sizeInMB} MB`,
// //       );
// //     }
// //   };

// //   async function compressVideo(fileData: FileData) {
// //     try {
// //       const startTime = new Date().getTime();
// //       const compressedVideoUri = await Video.compress(
// //         fileData.uri,
// //         {
// //           //   compressionMethod: 'auto', // You can choose 'auto' or specify your quality levels
// //           // quality: 0.7, // You can specify 'low', 'medium', or 'high'

// //           compressionMethod: 'manual',
// //           bitrate: 20000,
// //           minimumFileSizeForCompress: 100,
// //           //   maxWidth: 1000,
// //           //   quality: 0.8,
// //         },
// //         progress => {
// //           const scaledProgress = Math.ceil(progress * 80); // Scale to 80 instead of 100

// //           console.log('Compression Progress: ', scaledProgress);
// //         },
// //       );

// //       // Record the end time
// //       const endTime = new Date().getTime();

// //       // Calculate the time taken for compression in seconds
// //       const timeTakenInSeconds = (endTime - startTime) / 1000;

// //       setCompressionTime(timeTakenInSeconds);

// //       console.log(`Compression completed in ${timeTakenInSeconds} seconds`);
// //       // console.log('Compressed Video URI:', compressedVideoUri);

// //       console.log('Compressed Video URI:', compressedVideoUri);
// //       return compressedVideoUri;
// //     } catch (error) {
// //       console.error('Error compressing video:', error);
// //       return null;
// //     }
// //   }

// //   const stopRecording = async () => {
// //     if (cameraRef.current == null || !isRecording) return;

// //     await cameraRef.current.stopRecording();
// //   };

// //   if (!device) return <Text>Loading camera...</Text>;

// //   return (
// //     <View style={styles.container}>
// //       {isFocused && (
// //         <Camera
// //           style={styles.camera}
// //           ref={cameraRef}
// //           device={device}
// //           isActive={true}
// //           video={true}
// //           photo={true}
// //           audio={false}
// //           format={lowResolutionFormat}
// //           // fps={30}
// //           videoHdr={false}
// //         />
// //       )}
// //       <View style={styles.controls}>
// //         {/* <Text style={styles.timer}>{`Time: ${timer}sttt`}</Text> */}
// //         <SemiBoldText
// //           title={`Time: ${timer}s`}
// //           color={CustomColors.whiteColor}
// //           fontSize={18}
// //         />
// //         <VerticalSpacer height={10} />
// //         {!isRecording ? (
// //           <TouchableOpacity style={styles.button} onPress={startRecording}>
// //             <Text style={styles.buttonText}>Start Recording</Text>
// //           </TouchableOpacity>
// //         ) : (
// //           <TouchableOpacity style={styles.button} onPress={stopRecording}>
// //             <Text style={styles.buttonText}>Stop Recording</Text>
// //           </TouchableOpacity>
// //         )}
// //         {videoPath && (
// //           <>
// //             <Text style={styles.fileInfo}>
// //               Video Size: {fileSize} bytes {fileSizeMB.toFixed(2)} MB
// //             </Text>

// //             <Text style={styles.fileInfo}>
// //               Video Size: {compressedFileSizeMB} MB
// //             </Text>

// //             <Text style={styles.fileInfo}>
// //               Compression Time: {compressionTime} S
// //             </Text>
// //           </>
// //         )}
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#000',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   camera: {
// //     width: '100%',
// //     height: '70%',
// //   },
// //   controls: {
// //     alignItems: 'center',
// //     padding: 10,
// //   },
// //   button: {
// //     padding: 10,
// //     backgroundColor: 'red',
// //     borderRadius: 5,
// //   },
// //   buttonText: {
// //     color: 'white',
// //     fontSize: 16,
// //   },
// //   timer: {
// //     fontSize: 18,
// //     color: 'white',
// //     marginBottom: 10,
// //   },
// //   fileInfo: {
// //     fontSize: 14,
// //     color: 'white',
// //     marginTop: 10,
// //   },
// // });

// // export default VideoRecorder;

// import { useState, useEffect, useRef } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import {
//   Camera,
//   type CameraDeviceFormat,
//   useCameraDevice,
// } from 'react-native-vision-camera';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
// import RNFS from 'react-native-fs'; // To get file size
// import { SemiBoldText } from '../components/CustomText';
// import { CustomColors } from '../constants/CustomColors';
// import { VerticalSpacer } from '../components/Spacer';
// import { Video as VideoCompressor } from 'react-native-compressor';
// import VideoPlayer from 'react-native-video'; // Add VideoPlayer component
// import type { FileData } from './purchase/form/components/CustomImagePicker';

// const VideoRecorder = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [videoPath, setVideoPath] = useState<string | null>(null);
//   const [timer, setTimer] = useState(0); // Timer to track video length
//   const [fileSize, setFileSize] = useState(0); // File size of the video
//   const [fileSizeMB, setFileSizeMB] = useState(0); // File size of the video in MB
//   const [compressedFileSizeMB, setCompressedFileSizeMB] = useState(0);
//   const [compressionTime, setCompressionTime] = useState(0);
//   const [compressedVideoPath, setCompressedVideoPath] = useState<string | null>(
//     null
//   );
//   const [lowResolutionFormat, setLowResolutionFormat] = useState<
//     CameraDeviceFormat | undefined
//   >();
//   const [isPlayingOriginal, setIsPlayingOriginal] = useState(false);
//   const [isPlayingCompressed, setIsPlayingCompressed] = useState(false);
//   const navigation = useNavigation();

//   const cameraRef = useRef<Camera>(null);
//   const device = useCameraDevice('back');
//   const isFocused = useIsFocused();
//   let interval: any;

//   useEffect(() => {
//     if (device) {
//       const lowRes = device.formats.find(
//         (format) => format.videoWidth <= 640 && format.videoHeight <= 480
//       );
//       setLowResolutionFormat(lowRes);
//     }
//   }, [device]);

//   useEffect(() => {
//     const getCameraPermission = async () => {
//       await Camera.requestCameraPermission();
//     };
//     getCameraPermission();
//     return () => clearInterval(interval);
//   }, []);

//   useEffect(() => {
//     if (isRecording) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev + 1);
//       }, 1000);
//     } else {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [isRecording]);

//   const startRecording = async () => {
//     if (cameraRef.current == null) return;
//     try {
//       setIsRecording(true);
//       setTimer(0); // Reset the timer when starting recording
//       await cameraRef.current.startRecording({
//         fileType: 'mp4',
//         videoBitRate: 'extra-low',
//         onRecordingFinished: (video) => handleStopRecording(video),
//         onRecordingError: (error) => console.error(error),
//       });
//     } catch (e) {
//       console.error(e);
//       setIsRecording(false);
//     }
//   };

//   const handleStopRecording = async (video: { path: string }) => {
//     setIsRecording(false);
//     setVideoPath(video.path);
//     const stats = await RNFS.stat(video.path);
//     setFileSize(Number(stats.size));
//     const sizeInMB = Number(stats.size) / (1024 * 1024); // Convert bytes to MB
//     setFileSizeMB(sizeInMB);

//     const newFileData: FileData = {
//       uri: `file://${video.path}`,
//       name: 'videoFile.name',
//     };
//     const compressedVideoUri = await compressVideo(newFileData);
//     if (compressedVideoUri) {
//       setCompressedVideoPath(compressedVideoUri);
//       const compressedStats = await RNFS.stat(compressedVideoUri);
//       const compressedSizeInMB = Number(compressedStats.size) / (1024 * 1024);
//       setCompressedFileSizeMB(compressedSizeInMB);
//     }
//   };

//   // async function compressVideo(fileData: FileData) {
//   //   try {
//   //     const startTime = new Date().getTime();
//   //     const compressedVideoUri = await VideoCompressor.compress(
//   //       fileData.uri,
//   //       {
//   //         compressionMethod: 'auto',
//   //       },
//   //       progress => {
//   //         const scaledProgress = Math.ceil(progress * 80);
//   //         console.log('Compression Progress: ', scaledProgress);
//   //       },
//   //     );
//   //     const endTime = new Date().getTime();
//   //     const timeTakenInSeconds = (endTime - startTime) / 1000;
//   //     setCompressionTime(timeTakenInSeconds);
//   //     return compressedVideoUri;
//   //   } catch (error) {
//   //     console.error('Error compressing video:', error);
//   //     return null;
//   //   }
//   // }

//   async function compressVideo(fileData: FileData) {
//     try {
//       const startTime = new Date().getTime();

//       const compressedVideoUri = await VideoCompressor.compress(
//         fileData.uri,
//         {
//           compressionMethod: 'manual', // Switch to manual for more control
//           // quality: 'medium', // Options: 'low', 'medium', 'high'
//           bitrate: 2000000, // Higher bitrate for better quality
//           // minimumFileSizeForCompress: 100, // Minimum size in MB to compress
//         },
//         (progress) => {
//           const scaledProgress = Math.ceil(progress * 80);
//           console.log('Compression Progress: ', scaledProgress);
//         }
//       );

//       const endTime = new Date().getTime();
//       const timeTakenInSeconds = (endTime - startTime) / 1000;
//       setCompressionTime(timeTakenInSeconds);

//       return compressedVideoUri;
//     } catch (error) {
//       console.error('Error compressing video:', error);
//       return null;
//     }
//   }

//   const stopRecording = async () => {
//     if (cameraRef.current == null || !isRecording) return;
//     await cameraRef.current.stopRecording();
//   };

//   // const playOriginalVideo = () => {
//   //   setIsPlayingOriginal(true);
//   //   setIsPlayingCompressed(false);
//   // };

//   // const playCompressedVideo = () => {
//   //   setIsPlayingOriginal(false);
//   //   setIsPlayingCompressed(true);
//   // };

//   const playOriginalVideo = () => {
//     if (videoPath) {
//       navigation.navigate('VideoPlayerScreen', { videoUri: videoPath });
//     }
//   };

//   const playCompressedVideo = () => {
//     if (compressedVideoPath) {
//       navigation.navigate('VideoPlayerScreen', {
//         videoUri: compressedVideoPath,
//       });
//     }
//   };

//   if (!device) return <Text>Loading camera...</Text>;

//   return (
//     <View style={styles.container}>
//       {isFocused && (
//         <Camera
//           style={styles.camera}
//           ref={cameraRef}
//           device={device}
//           isActive={true}
//           video={true}
//           photo={true}
//           audio={false}
//           format={lowResolutionFormat}
//         />
//       )}
//       <View style={styles.controls}>
//         <SemiBoldText
//           title={`Time: ${timer}s`}
//           color={CustomColors.whiteColor}
//           fontSize={18}
//         />
//         <VerticalSpacer height={10} />
//         {!isRecording ? (
//           <TouchableOpacity style={styles.button} onPress={startRecording}>
//             <Text style={styles.buttonText}>Start Recording</Text>
//           </TouchableOpacity>
//         ) : (
//           <TouchableOpacity style={styles.button} onPress={stopRecording}>
//             <Text style={styles.buttonText}>Stop Recording</Text>
//           </TouchableOpacity>
//         )}
//         {videoPath && (
//           <>
//             <Text style={styles.fileInfo}>
//               Original Video Size: {fileSizeMB.toFixed(2)} MB
//             </Text>
//             <Text style={styles.fileInfo}>
//               Compressed Video Size: {compressedFileSizeMB} MB
//             </Text>
//             <Text style={styles.fileInfo}>
//               Compression Time: {compressionTime} S
//             </Text>
//             <View style={styles.buttonContainer}>
//               <TouchableOpacity
//                 style={styles.playButton}
//                 onPress={playOriginalVideo}
//               >
//                 <Text style={styles.buttonText}>Play Original Video</Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={styles.playButton}
//                 onPress={playCompressedVideo}
//               >
//                 <Text style={styles.buttonText}>Play Compressed Video</Text>
//               </TouchableOpacity>
//             </View>
//           </>
//         )}
//         {isPlayingOriginal && videoPath && (
//           <VideoPlayer
//             source={{ uri: videoPath }}
//             style={styles.videoPlayer}
//             controls
//           />
//         )}
//         {isPlayingCompressed && compressedVideoPath && (
//           <VideoPlayer
//             source={{ uri: compressedVideoPath }}
//             style={styles.videoPlayer}
//             controls
//           />
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   camera: {
//     width: '100%',
//     height: '70%',
//   },
//   controls: {
//     alignItems: 'center',
//     padding: 10,
//   },
//   button: {
//     padding: 10,
//     backgroundColor: 'red',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//   },
//   timer: {
//     fontSize: 18,
//     color: 'white',
//     marginBottom: 10,
//   },
//   fileInfo: {
//     fontSize: 14,
//     color: 'white',
//     marginTop: 10,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     marginTop: 20,
//   },
//   playButton: {
//     padding: 10,
//     backgroundColor: 'blue',
//     borderRadius: 5,
//   },
//   videoPlayer: {
//     width: '100%',
//     height: 200,
//     marginTop: 20,
//   },
// });

// export default VideoRecorder;
