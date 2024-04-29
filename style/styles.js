import {StyleSheet} from 'react-native';


// const FILL_RED = '#FF5733';

export const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom:5,
  },

  spacerHorizontal: {
    height: '3%',
  },
  container: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingBottom:10
  },
  closeText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButtonContainer: {
    position: 'absolute', 
    right: 5, 
     justifyContent: 'center', 
  alignItems: 'center', 
  },
  closeButton: {
   width: 33,
  height: 33,
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: 7,
    backgroundColor: '#ffffff',
    borderRadius: 3,

   
  elevation: 4,

  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.15,
  shadowRadius: 3.84,
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
