// import React from 'react';
// import {View, StyleSheet} from 'react-native';
// import {WebView} from 'react-native-webview'; // Import WebView

// const PrivacyPolicyContainer: React.FC = () => {
//   return (
//     <View style={styles.container}>
//       <WebView
//         source={{uri: 'https://www.mycover.ai/privacy-policy'}} // Load the URL
//         style={{height: 600, backgroundColor: 'red'}}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'red',
//   },
// });

// export default PrivacyPolicyContainer;
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { VerticalSpacer } from './Spacer';
import PrivacyDotContainer from './PrivacyDotContainer';
import { RegularText, SemiBoldText } from './CustomText';

const PrivacyPolicyContainer: React.FC = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <VerticalSpacer height={10} />

        <RegularText
          title={`Wherever the name "MyCover.ai" is used in this policy, it implies one or more of the following MyCoverGenius Ltd subsidiaries, which may offer products or services on the website. Further details can be found on the respective company's website.`}
          fontSize={15}
          textAlign="left"
          lineHeight={21}
        />

        <VerticalSpacer height={20} />

        <RegularText
          title='MyCoverGenius Ltd trading as "Cover Genius" is a private company limited by shares and registered with the Corporate Affairs Commission, with RC No. 1918634.'
          fontSize={15}
          textAlign="left"
          lineHeight={21}
        />
        <VerticalSpacer height={30} />

        <SemiBoldText
          title="Information Collection And Use"
          fontSize={18}
          textAlign="left"
        />
        <VerticalSpacer height={10} />

        <RegularText
          title="This Data Privacy Policy stipulates the basis for the collection, use,
          and disclosure of personal information from users of the website by
          MyCoverGenius Ltd and its subsidiaries in line with applicable data
          protection laws..."
          fontSize={15}
          lineHeight={21}
        />
        <VerticalSpacer height={5} />

        <RegularText
          title=" The Personal Data you provide to us is:"
          fontSize={15}
        />

        <RegularText title="" fontSize={15} />
        <VerticalSpacer height={5} />

        <PrivacyDotContainer title="processed fairly, lawfully and in a transparent manner;" />
        <PrivacyDotContainer title="collected for a specific purpose and is not processed in a way which is incompatible with the purpose which MyCover.ai collected it;" />
        <PrivacyDotContainer title="adequate, relevant and limited to what is necessary in relation to the purposes for which it is processed;" />
        <PrivacyDotContainer title="kept accurate, secure and, where necessary kept up to date;" />
        <PrivacyDotContainer title="kept no longer than is necessary for the purposes for which the Personal Data is processed;" />
        <PrivacyDotContainer title="processed in accordance with your rights;" />

        <VerticalSpacer height={10} />

        <RegularText
          title="We will only transfer your Personal Data to another country or an
          international organization..."
          fontSize={15}
          lineHeight={21}
        />

        <VerticalSpacer height={30} />

        <SemiBoldText title="Collection Of Personal Data?" fontSize={18} />
        <VerticalSpacer height={10} />

        <RegularText
          title="We collect Personal Data: directly from you;"
          fontSize={15}
        />
        <VerticalSpacer height={10} />

        <PrivacyDotContainer title="via enquiry, registration, claim forms, feedback forms and forums;" />
        <PrivacyDotContainer title="when you purchase any of our products or services;" />
        <PrivacyDotContainer title="when you fill out a survey, or vote in a poll on our website;" />
        <PrivacyDotContainer title="through quotes and application forms;" />
        <PrivacyDotContainer title="via cookies. You can find out more about this in our cookies policy;" />
        <PrivacyDotContainer title="via our telephone calls with you, which may be recorded;" />
        <PrivacyDotContainer title="via live chat, chatbot and profilers;" />
        <PrivacyDotContainer title="through web analytics tags;" />
        <PrivacyDotContainer title="From several different sources including:" />

        <View style={styles.nestedContainer}>
          <PrivacyDotContainer title="directly from an individual or employer who has a policy with us under which you are insured, for example, you are a named driver on your partner's motor insurance policy;" />
          <PrivacyDotContainer title="directly from an employer which funds a Health Insurance policy that we administer where you are a beneficiary;" />
          <PrivacyDotContainer title="from social media, when fraud is suspected; and" />
          <PrivacyDotContainer title="Other third parties including:" />

          <View style={styles.subNestedContainer}>
            <PrivacyDotContainer title="your family members where you may be incapacitated or unable to provide information relevant to your policy;" />
            <PrivacyDotContainer title="contractors, consultants, business partners who sell our products and services via their platforms and channels;" />
            <PrivacyDotContainer title="medical professionals and hospitals;" />
            <PrivacyDotContainer title="third parties such as companies who provide consumer classification for marketing purposes e.g. market segmentation data." />
          </View>
        </View>

        <VerticalSpacer height={30} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 5,
  },
  nestedContainer: {
    paddingLeft: 25,
  },
  subNestedContainer: {
    paddingLeft: 25,
  },
});

export default PrivacyPolicyContainer;
