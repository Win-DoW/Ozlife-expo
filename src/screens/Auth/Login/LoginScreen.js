import 'react-native-gesture-handler';
import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AnimatedLoader from 'react-native-animated-loader';

import AppHeader from 'utils/Header';

import { Auth } from 'aws-amplify';

const LoginScreen = ({ navigation, route }) => {

  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');  

  const ref_email = useRef();
  const ref_password = useRef();

  const signIn = async () => {
    try {
      setVisible(true);

      await Auth.signIn(email, password);

      setVisible(false);
      setErrorMessage('')
      
      navigation.reset({routes: [{name: 'MainNavi'}]});

    } catch (error) {
      setVisible(false);
      console.log('error signing in', error);
      if(error.message === 'User is not confirmed.') {
        await Auth.resendSignUp(email)
        navigation.reset({routes: [
          {
            name: 'SignUpFinishScreen',
            params: { 
              email,
              password,
            }
          },
        ]});
      } else if(error.message === 'User does not exist.') {
        setErrorMessage('존재하지 않는 이메일입니다.')
      } else if(error.message === 'Incorrect username or password.') {
        setErrorMessage('비밀번호가 틀립니다.')
      } else if(error.message === 'Password attempts exceeded') {
        setErrorMessage('비밀번호 입력을 초과하였습니다. 잠시 후 시도해 주시기 바랍니다.')
      } else {
        setErrorMessage('로그인에 실패하였습니다.')
      }
    }
  }

  const checkInputComplete = () => {
    if(email != '' && password != '') {
      return true;
    } else {
      return false;
    }
  }
  
  const goToBack = () => {
    navigation.pop()
  }

  const goToSignUp = () => {
    navigation.navigate('SignUpStartScreen')
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>

          <AnimatedLoader
            visible={visible}
            overlayColor="rgba(255,255,255,0.75)"
            source={require("utils/Loader.json")}
            animationStyle={{ width: 300, height: 300 }}
            speed={1}
          />

          <AppHeader
            title={'로그인'}
            noIcon={false}
            leftIcon={<Ionicons name="chevron-back-outline" size={32} color="#000000" />}
            leftIconPress={goToBack}
          />

          <View style={{ paddingHorizontal: 24 }}>
            <View style={{ marginTop: 24 }}>
              <Text style={styles.inputTitle}>이메일</Text>
              <TextInput 
                ref={ref_email}
                style={styles.textInput} 
                placeholder='이메일을 입력해주세요.'
                placeholderTextColor='#dddddd'
                onChangeText={(text) => setEmail(text)}
                returnKeyType="next"
                onSubmitEditing={() => ref_password.current.focus()}
              />
            </View>

            <View style={{ marginTop: 24 }}>
              <Text style={styles.inputTitle}>비밀번호</Text>
              <TextInput 
                ref={ref_password}
                style={styles.textInput} 
                placeholder='비밀번호를 입력해주세요.'
                placeholderTextColor='#dddddd'
                secureTextEntry={true}
                returnKeyType="done"
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            {
              errorMessage != '' ?
              <View style={{ marginTop: 10 }}>
                <Text style={styles.error}>
                  {errorMessage}
                </Text>
              </View>
              :
              null
            }

            <View style={{ marginTop: 24 }}>
              <TouchableOpacity
                style={{...styles.loginBtn, backgroundColor: checkInputComplete() ? '#15b6f1' : '#E7E7EC'}}
                onPress={checkInputComplete() ? signIn : null}
              >
                <Text style={styles.loginBtnText}>로그인</Text>
              </TouchableOpacity>
            </View>

            <View style={{ marginTop: 16, alignItems: 'center' }}>
              <TouchableOpacity style={styles.singUpBtn} onPress={goToSignUp}>
                <Text style={styles.signUpText}>회원가입</Text>
              </TouchableOpacity>
            </View>
            
          </View>

        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#FFFFFF'
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  textInput: {
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    color: '#666666'
  },
  loginBtn: {
    borderRadius: 3,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginBtnText: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    color: '#FFFFFF'
  },
  singUpBtn: {
    borderBottomColor: '#1a1a1a',
    borderBottomWidth: 1
  },
  signUpText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 24
  },
  error: {
    fontSize: 12,
    fontWeight: '400',
    color: 'red',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
})

export default LoginScreen;