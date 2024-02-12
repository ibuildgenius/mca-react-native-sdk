import {View, Image, useWindowDimensions, ScrollView} from 'react-native';
import RenderHTML from 'react-native-render-html';
import {styles} from '../style/styles';
export default function HowToClaim(props) {
  let data = props.data;

  const {width} = useWindowDimensions();

  let html = data.how_to_claim;

  let tagStyle = {
    span: {
      fontFamily: 'metropolis_regular',
      marginBottom: 10,
    },

    ul: {
      color: '#3BAA90',
    },
  };
  return (
    <View style={styles.htmlContainer}>
      <Image
        style={styles.infoImagesStyle}
        source={require('../assets/how_it_works.png')}
      />

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.htmlContent}>
          <RenderHTML
            tagsStyles={tagStyle}
            contentWidth={width}
            source={{html: html}}
          />
        </View>
      </ScrollView>
    </View>
  );
}
