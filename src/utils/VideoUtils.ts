import { Video } from 'react-native-compressor';
import type { FileData } from '../screens/purchase/form/components/CustomImagePicker';
import RNFS from 'react-native-fs';

export class VideoUtils {
  // @ts-nocheck
  static async compressVideo(
    fileData: FileData,
    setIsInspectionLoading: (data: number) => void
  ) {
    try {
      // const startTime = new Date().getTime();
      const compressedVideoUri = await Video.compress(
        fileData.uri,
        {
          // progressDivider: 10,
          compressionMethod: 'manual',
          bitrate: 2000000,
        },

        (progress) => {
          const scaledProgress = Math.ceil(progress * 80); // Scale to 80 instead of 100
          setIsInspectionLoading(scaledProgress);
          console.log('Compression Progress: ', scaledProgress);
        }
      );
      // const endTime = new Date().getTime();
      // const timeTakenInSeconds = (endTime - startTime) / 1000;
      console.log('Compressed Video URI:', compressedVideoUri);
      // showToast(ToastStatus.failed, `Compression Took ${timeTakenInSeconds} S`);
      return compressedVideoUri;
    } catch (error) {
      console.error('Error compressing video:', error);
      return null;
    }
  }

  static async getFileSize(fileData: FileData): Promise<number | null> {
    try {
      try {
        const stats = await RNFS.stat(fileData.uri);

        const sizeInMB = Number(stats.size) / (1024 * 1024);
        return sizeInMB;
      } catch (error) {
        console.error('Error fetching file size:', error);
        return null;
      }
    } catch (error) {
      console.error('Error fetching file size:', error);
      return null;
    }
  }
}

// Now you can call it like this:
//   const compressedUri = await VideoUtils.compressVideo(fileData, loadStore);
