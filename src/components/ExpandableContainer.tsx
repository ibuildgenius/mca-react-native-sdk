// import React, {ReactNode, useState} from 'react';
// import {
//   Dimensions,
//   LayoutAnimation,
//   ScrollView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import {SemiBoldText} from './CustomText';
// import Svg, {Path} from 'react-native-svg';
// import HTML from 'react-native-render-html';
// import {CustomColors} from '../constants/CustomColors';

// interface PlanExpandableContainerProps {
//   title: string;
//   subTitle: string;
//   titleColor: string | null;
//   children: ReactNode | null;

//   isExpanded: boolean;
//   setIsExpanded: (data: boolean) => void; // Passed from parent
//   collapseOthers: () => void;

//   // isDefaultExpanded: boolean;
// }

// const ExpandableContainer: React.FC<PlanExpandableContainerProps> = ({
//   title,
//   subTitle,
//   titleColor,
//   children,
//   isExpanded,
//   setIsExpanded,
//   collapseOthers,
// }) => {
//   // const [isExpanded, setIsExpanded] = useState(false);
//   // const [isExpanded, setIsExpanded] = useState(isDefaultExpanded);

//   const toggleExpand = () => {
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
//     collapseOthers();
//     setIsExpanded(!isExpanded);
//   };

//   return (
//     <View style={styles.expandableContainer}>
//       <TouchableOpacity onPress={toggleExpand} style={styles.headerRow}>
//         <SemiBoldText
//           title={title}
//           fontSize={16}
//           color={titleColor ?? CustomColors.blackColor}
//         />

//         <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
//           <Path
//             d={
//               isExpanded
//                 ? 'M12 8.83l6.41 6.41 1.41-1.41-8-8-8 8 1.41 1.41L12 8.83z'
//                 : 'M12 15.17L5.59 8.59 4.17 10l8 8 8-8-1.41-1.41L12 15.17z'
//             }
//             fill={CustomColors.blackColor}
//           />
//         </Svg>
//       </TouchableOpacity>
//       {/* {isExpanded && (
//         <ScrollView style={styles.content}>
//           {children == null ? (
//             <HTML
//               source={{html: subTitle}}
//               contentWidth={Dimensions.get('window').width}
//             />
//           ) : (
//             children
//           )}

//         </ScrollView>
//       )}  */}

//       {isExpanded && (
//         <View style={styles.expandedContent}>
//           {children == null ? (
//             <HTML
//               source={{html: subTitle}}
//               contentWidth={Dimensions.get('window').width}
//             />
//           ) : (
//             <ScrollView
//               style={styles.scrollableContent}
//               nestedScrollEnabled={true} // Enable nested scrolling
//             >
//               {children}
//             </ScrollView>
//           )}
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: CustomColors.whiteColor,
//   },
//   content: {
//     minHeight: 50, // You can set a minimum height
//     maxHeight: 250, // Set the maximum height
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//   },
//   // scrollableContent: {
//   //   maxHeight: 50, // Limit the height of the scrollable content
//   //   paddingHorizontal: 10,
//   //   paddingVertical: 10,
//   // },

//   expandableContainer: {
//     backgroundColor: CustomColors.backBorderColor,
//     borderRadius: 5,
//     marginBottom: 25,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//   },
//   headerRow: {
//     paddingVertical: 8,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },

//   expandedContent: {
//     marginTop: 10,
//     maxHeight: 300, // Set a max height for the expanded content
//     // overflow: 'hidden',
//   },
//   detailRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//   },
//   detailColumn: {
//     flex: 1,
//   },

//   statusBadge: {
//     backgroundColor: CustomColors.lightOrangeColor,
//     borderRadius: 12,
//     paddingHorizontal: 10,
//     paddingVertical: 10,
//   },
// });

// export default ExpandableContainer;
import React, { type ReactNode, useRef } from 'react';
import {
  Dimensions,
  LayoutAnimation,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
} from 'react-native';
import { SemiBoldText } from './CustomText';
import Svg, { Path } from 'react-native-svg';
import HTML from 'react-native-render-html';
import { CustomColors } from '../constants/CustomColors';

interface PlanExpandableContainerProps {
  title: string;
  subTitle: string;
  titleColor?: string | null;
  children?: ReactNode | null;

  isExpanded: boolean;
  setIsExpanded: (data: boolean) => void; // Passed from parent
  collapseOthers: () => void;
}

const ExpandableContainer: React.FC<PlanExpandableContainerProps> = ({
  title,
  subTitle,
  titleColor,
  children,
  isExpanded,
  setIsExpanded,
  collapseOthers,
}) => {
  const parentScrollRef = useRef<ScrollView>(null);
  const childScrollRef = useRef<ScrollView>(null);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    collapseOthers();
    setIsExpanded(!isExpanded);
  };

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset, contentSize, layoutMeasurement } = e.nativeEvent;

    // Check if we have reached the top or bottom of the inner scroll view
    const isAtTop = contentOffset.y <= 0;
    const isAtBottom =
      contentOffset.y + layoutMeasurement.height >= contentSize.height;

    // If we are at the top or bottom of the inner scroll, enable the parent scroll view
    parentScrollRef.current?.setNativeProps({
      scrollEnabled: isAtTop || isAtBottom,
    });
  };

  return (
    <View style={styles.expandableContainer}>
      <TouchableOpacity onPress={toggleExpand} style={styles.headerRow}>
        <SemiBoldText
          title={title}
          fontSize={16}
          color={titleColor ?? CustomColors.blackColor}
        />

        <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <Path
            d={
              isExpanded
                ? 'M12 8.83l6.41 6.41 1.41-1.41-8-8-8 8 1.41 1.41L12 8.83z'
                : 'M12 15.17L5.59 8.59 4.17 10l8 8 8-8-1.41-1.41L12 15.17z'
            }
            fill={CustomColors.blackColor}
          />
        </Svg>
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.expandedContent}>
          <ScrollView
            style={styles.scrollableContent}
            ref={childScrollRef}
            nestedScrollEnabled={true}
            onScroll={handleScroll}
            scrollEventThrottle={16} // Ensure frequent scroll updates
          >
            {children == null ? (
              <HTML
                source={{ html: subTitle }}
                contentWidth={Dimensions.get('window').width}
              />
            ) : (
              children
            )}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  expandableContainer: {
    backgroundColor: CustomColors.backBorderColor,
    borderRadius: 5,
    marginBottom: 25,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  headerRow: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  expandedContent: {
    marginTop: 10,
    // maxHeight: 300, // Set a max height for the expanded content
    // overflow: 'hidden',
  },
  scrollableContent: {
    maxHeight: 200, // Limit the height of the scrollable content
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

export default ExpandableContainer;
