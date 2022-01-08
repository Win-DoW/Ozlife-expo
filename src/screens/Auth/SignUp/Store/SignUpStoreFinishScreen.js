import 'react-native-gesture-handler';
import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import AppHeader from 'utils/Header';

const windowHeight = Dimensions.get('window').height;

const SignUpStoreFinishScreen = ({ navigation, route }) => {

  const store = route.params.store;
  
  return (
    <SafeAreaView style={styles.container}>

      <AppHeader
        title={"가게 등록 완료"}
      />

      <View style={{ marginTop: windowHeight * 0.25 }}>
        <Text style={styles.text}>가게 등록을</Text>
        <Text style={styles.text}>완료하였습니다.</Text>
      </View>
      

      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={() => navigation.reset({ routes: [{ name: 'MainNavi' }] })}
          style={styles.button}
        >
          <Text style={styles.buttontext}>홈으로 가기</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  text: {
    fontSize: 30,
    alignSelf: 'center',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  button: {   
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#15b6f1'
  },
  buttontext: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff'
  }
})

export default SignUpStoreFinishScreen;