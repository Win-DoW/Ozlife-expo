import 'react-native-gesture-handler';
import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

import { Auth } from 'aws-amplify';

const LoginScreen = ({ navigation, route }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  

  const ref_email = useRef();
  const ref_password = useRef();

  const signIn = async () => {
    try {
      setLoading(true);

      await Auth.signIn(email, password);

      setLoading(false);
      
      navigation.reset({routes: [{name: 'MainNavi'}]});

    } catch (error) {
      setLoading(false);
      console.log('error signing in', error);
      if(error.message === 'User is not confirmed.') {
        await Auth.resendSignUp(email)
        navigation.reset({routes: [
          {
            name: 'ConfirmScreen',
            params: { 
              email,
              password,
            }
          },
        ]});
      }
      setError(true);
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
            <Text style={styles.text}>이메일</Text>
            <TextInput 
              style={styles.textinput} 
              placeholder='이메일을 입력해주세요.'
              onChangeText={(text) => setEmail(text)}
              returnKeyType="next"
              onSubmitEditing={() => ref_password.current.focus()}
              ref={ref_email}
            />
          </View>

          <View style={styles.formbox}>
            <Text style={styles.text}>비밀번호</Text>
            <TextInput 
              style={styles.textinput} 
              placeholder='비밀번호를 입력해주세요.'
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              ref={ref_password}
            />
          </View>

          {error === true ?
          <View style={styles.formbox}>
            <Text style={styles.error}>
              가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.
            </Text>
          </View>
          : null }
          

          <TouchableOpacity style={styles.button} onPress={signIn}>
            <Text style={styles.buttontext}>로그인</Text>
          </TouchableOpacity>

          <TouchableOpacity style={{marginTop:30}} onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.signUp}>회원가입</Text>
          </TouchableOpacity>
          
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
  button: {
    width: '90%',
    height: 60,
    backgroundColor: '#15b6f1',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttontext: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff'
  },
  signUp: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
})

export default LoginScreen;