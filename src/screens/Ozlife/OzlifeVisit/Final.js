import 'react-native-gesture-handler';
import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from "react-native";
import AppHeader from 'utils/Header';

const Final = ({ navigation, route }) => {

  const ozlife = route.params.ozlife;
  
  return (
    <SafeAreaView style={styles.container}>

      <AppHeader
        title={"오지랖 등록 완료"}
      />

      <Text style={styles.text}>
        오지랖 등록을
      </Text>

      <Text style={styles.text}>
        완료하였습니다.
      </Text>

      <View style={styles.bottom}>
        <TouchableOpacity onPress={() =>
          navigation.navigate("OzlifeProfileScreen", {
            ozlife,
            userID: ozlife.userID,
          })}
          style={styles.button}>
          <Text style={styles.buttontext}>오지랖 상세 보기</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.reset({ routes: [{ name: 'MainNavi' }] })} style={styles.button}>
          <Text style={styles.buttontext}>홈으로 가기</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 30,
    alignSelf: 'center',
    marginTop: 60,
  },
  bottom: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {   
    width: '50%',
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

export default Final;