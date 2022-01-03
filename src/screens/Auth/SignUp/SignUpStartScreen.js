import 'react-native-gesture-handler';
import React, { useState, useRef } from "react";
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';

import { Auth } from 'aws-amplify';

const SignUpStartScreen = ({ navigation, route }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const ref_phoneNumber = useRef();
  const ref_email = useRef();
  const ref_password = useRef();
  const ref_password2 = useRef();

  const signUp = async () => {
    try {
      setLoading(true);

      compare();

      if(error) return;

      await Auth.signUp({
        username: email,
        password: password,
        attributes: {
          email: email,
          phone_number: '+82' + phoneNumber,
        }
      })

      setLoading(false);
      navigation.reset({routes: [
        {
          name: 'ConfirmScreen',
          params: {
            phoneNumber,
            email,
            password,
          }
        },
      ]});
    } catch (error) {
      setLoading(false);
      console.log('error signing up:', error);
    }
  }

  const compare = () => {
    if(password !== password2) setError(true);
    else setError(false);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <ScrollView>

            <Spinner
              //visibility of Overlay Loading Spinner
              visible={loading}
              //Text with the Spinner
              textContent={'Loading...'}
              //Text style of the Spinner Text
              textStyle={styles.spinnerTextStyle}
            />

            <View style={styles.formbox}>
              <Text style={styles.text}>전화번호</Text>
              <TextInput 
                style={styles.textinput} 
                keyboardType='numeric'
                placeholder='전화번호를 입력해주세요.'
                onChangeText={(text) => setPhoneNumber(text)}
                returnKeyType="next"
                onSubmitEditing={() => ref_email.current.focus()}
                ref={ref_phoneNumber}
              />
            </View>

            <View style={styles.formbox}>
              <Text style={styles.text}>이메일</Text>
              <TextInput 
                style={styles.textinput} 
                placeholder='example@gmail.com'
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
                onSubmitEditing={() => ref_password2.current.focus()}
                ref={ref_password}
              />
            </View>

            <View style={styles.formbox}>
              <Text style={styles.text}>비밀번호</Text>
              <TextInput 
                style={styles.textinput} 
                placeholder='비밀번호를 재입력해주세요.'
                secureTextEntry={true}
                onChangeText={(text) => setPassword2(text)}
                onSubmitEditing={() => compare()}
                ref={ref_password2}
              />
            </View>

            {error === true ?
            <View style={styles.formbox}>
              <Text style={styles.error}>
                비밀번호가 일치하지 않습니다.
              </Text>
            </View>
            : null }

          </ScrollView>

          <View style={styles.bottom}>
            <TouchableOpacity onPress={signUp} style={styles.button}>
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
    marginTop: 100,
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

export default SignUpStartScreen;