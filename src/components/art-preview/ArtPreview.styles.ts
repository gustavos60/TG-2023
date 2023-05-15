import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  touchable: {
    marginBottom: 15,
  },
  container: {
    height: 75,
    flexDirection: 'row',
    borderRadius: 10,
  },
  image: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: '100%',
    flex: 1,
  },
  textContainer: {
    padding: 5,
    flex: 3,
  },
  title: {
    flex: 1,
  },
  author: {
    textAlign: 'right',
  },
  date: {
    textAlign: 'left',
    marginRight: 20,
  },
});
