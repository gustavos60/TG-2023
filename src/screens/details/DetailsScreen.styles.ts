import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerBack: {
    position: 'absolute',
    left: 10,
  },
  headerLabel: {
    marginBottom: 15,
    textAlign: 'center',
  },
  informationContainer: {
    padding: 10,
    width: '100%',
  },
  informationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  informationLabel: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: 200,
  },
});
