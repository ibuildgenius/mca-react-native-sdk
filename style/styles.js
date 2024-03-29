import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingHorizontal: 12,
    // paddingTop:5,
    paddingBottom:5,
  },

  spacerHorizontal: {
    height: '3%',
  },

  titleText: {
    color: '#000',
    margin: 4,
    fontSize: 18,
    fontWeight: '500',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'metropolis_bold',
    paddingBottom: 15
  },

  listItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 4,
    backgroundColor: '#ffffff',
    borderRadius: 3,
  },

  listImage: {
    width: 38,
    height: 38,
  },

  logo: {
    margin: 12,
    width: 150,
    height: 30,
  },

  poweredBy: {
    margin: 12,
  },

  htmlContainer: {
    alignItems: 'center',
    flex: 1,
    width: '99%',
  },
  infoImagesStyle: {
    margin: 12,
    width: 70,
    height: 70,
  },
  htmlContent: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop:10
  },
  inActiveTabContainer: {
    flex: 1,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1, // Set the width of the border
    borderRadius: 4, // Set border radius if needed
  },
});
