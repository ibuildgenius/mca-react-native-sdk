import {StyleSheet} from 'react-native';


const FILL_RED = '#FF5733';

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
  container: {
    flexDirection: 'row', // To align items horizontally
    justifyContent: 'center', // To center items horizontally
    alignItems: 'center', // To center items vertically
    paddingHorizontal: 16, // Horizontal padding for the container
    paddingBottom:10
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButtonContainer: {
    position: 'absolute', // Absolute positioning for the close button
    right: 5, // Align the close button to the right
     justifyContent: 'center', // Center vertically
  alignItems: 'center', // Center horizontally
  },
  closeButton: {
   width: 36,
  height: 36,
  borderRadius: 18, 
  alignItems: 'center',
  justifyContent: 'center', // Center vertically
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
