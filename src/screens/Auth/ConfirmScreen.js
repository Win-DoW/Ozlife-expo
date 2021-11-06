import 'react-native-gesture-handler';
import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView } from "react-native";

import Spinner from 'react-native-loading-spinner-overlay';

import { Auth } from 'aws-amplify';

const ConfirmScreen = ({ navigation, route }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [code, setCode] = useState('');

  const confirmSignUp = async () => {
    try {
      setLoading(true);

      await Auth.confirmSignUp(route.params.email, code);
      await Auth.signIn(route.params.email, route.params.password);

      setLoading(false);
      navigation.reset({routes: [{name: 'NewProfileScreen'}]});

    } catch (error) {
      setLoading(false);
      setError(true);
      console.log('error confirming sign up', error);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>

          <Spinner
            //visibility of Overlay Loading Spinner
            visible={loading}
            //Text with the Spinner
            textContent={'Loading...'}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
          />

          <View style={styles.formbox}>
            <Text style={styles.text}>인증번호</Text>
            <TextInput
              keyboardType='numeric'
              style={styles.textinput} 
              placeholder='인증번호를 입력해주세요.'
              onChangeText={(text) => setCode(text)}
              />
          </View>

          {error === true ?
          <View style={styles.formbox}>
            <Text style={styles.error}>
              인증번호가 잘못되었습니다.
            </Text>
          </View>
          : null }

          <View style={styles.bottom}>
            <TouchableOpacity onPress={confirmSignUp} style={styles.button}>
              <Text style={styles.buttontext}>다음</Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

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
  error: {
    fontSize: 16,
    fontWeight: '500',
    color: 'red',
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
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
})

export default ConfirmScreen;