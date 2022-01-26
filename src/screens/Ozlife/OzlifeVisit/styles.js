import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'flex-start', 
    backgroundColor: '#FFFFFF'
  },
  formbox: {
    marginTop: 30,
    marginHorizontal: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  textinput: {
    fontSize: 14,
    color: '#666666',
    height: 40,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 100,
  },
  button: {
    height: 60,
    backgroundColor: '#15b6f1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttontext: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff'
  },
  image: {
    height: 66,
    width: 66,
    borderRadius: 33,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginRight: 16
  },
  imageview: {
    width: 66,
    height: 66,
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  selfinfo: {
    fontSize: 14,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  promotionBtn: {
    width: '48%',
    alignItems: 'center', 
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 14 
  },
  promotionPressBtn: {
    width: '48%',
    alignItems: 'center', 
    borderWidth: 0,
    padding: 14,
    backgroundColor: '#28c8f3',
  },
  promotionText: {
    fontSize: 14,
    color: '#aaa'
  },
  promotionPressText: {
    fontSize: 14,
    color: '#fff'
  },
  headerContainer: {
    height: 56,
    borderColor: "#dddddd",
    borderBottomWidth: 1,
  },
  titleContainer: {
    position: 'absolute',
    top: 8,
    left: 50,
    justifyContent: 'center',
  },
  leftIcon: {
    position: 'absolute',
    top: 10,
    left: 10,
    justifyContent: 'center'
  },
})

export default styles;