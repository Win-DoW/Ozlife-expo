import 'react-native-gesture-handler';
import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from "react-native";

const FinishScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.text}>
        가입을 완료하였습니다.
      </Text>

      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => navigation.reset({routes: [{name: 'MainNavi'}]})} style={styles.button}>
          <Text style={styles.buttontext}>오지랖 시작하기</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 100,
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  button: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#15b6f1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttontext: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff'
  }
})

export default FinishScreen;