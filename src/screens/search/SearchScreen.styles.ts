import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
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
  inputContainer: {
    padding: 20,
  },
  input: {
    width: '100%',
  },
  emptyLabel: {
    textAlign: 'center',
  },
  listContainer: {
    paddingTop: 15,
    paddingBottom: 200,
  },
});
