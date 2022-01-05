import React, { useState, useRef, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from "react-native-vector-icons/Ionicons";
import Spinner from "react-native-loading-spinner-overlay";

import AppHeader from "utils/Header";

const SignUpStartScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [ruleError, setRuleError] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const ref_email = useRef();
  const ref_password = useRef();
  const ref_password2 = useRef();

  useEffect(() => {
    if ( !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/.test(password)) {
      setRuleError(true)
    } else {
      setRuleError(false)
    }
  }, [password])

  const checkPWRule = () => {
    if(ruleError) {
      return true;
    } else {
      return false;
    }
  }

  const compare = () => {
    if (password !== password2) setError(true);
    else setError(false);
  };

  const goToBack = () => {
    navigation.pop();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Spinner
        //visibility of Overlay Loading Spinner
        visible={loading}
        //Text with the Spinner
        textContent={"Loading..."}
        //Text style of the Spinner Text
        textStyle={styles.spinnerTextStyle}
      />

      <AppHeader
        title={"정보 입력"}
        noIcon={false}
        leftIcon={
          <Ionicons name="chevron-back-outline" size={32} color="#000000" />
        }
        leftIconPress={goToBack}
      />

      <KeyboardAwareScrollView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.formBox}>
              <Text style={styles.bigText}>이메일</Text>
              <TextInput
                ref={ref_email}
                style={styles.textInput}
                placeholder="example@gmail.com"
                placeholderTextColor='#dddddd'
                onChangeText={(text) => setEmail(text)}
                returnKeyType="next"
                onSubmitEditing={() => ref_password.current.focus()}
              />
            </View>

            <View style={styles.formBox}>
              <Text style={styles.bigText}>비밀번호</Text>
              <TextInput
                ref={ref_password}
                style={styles.textInput}
                placeholder="비밀번호를 입력해주세요"
                placeholderTextColor='#dddddd'
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}
                returnKeyType="next"
                onSubmitEditing={() => ref_password2.current.focus()}
              />
            </View>

            {
                checkPWRule() ?
                <Text style={styles.errorMessage}>숫자/영문대소문자/특수문자를 모두 포함해 8~16자로 입력해주세요.</Text>
                :
                null
            }

            <View style={styles.formBox}>
              <Text style={styles.bigText}>비밀번호 확인</Text>
              <TextInput
                ref={ref_password2}
                style={styles.textInput}
                placeholder="한 번 더 비밀번호를 입력해주세요"
                placeholderTextColor='#dddddd'
                secureTextEntry={true}
                onChangeText={(text) => setPassword2(text)}
                returnKeyType="done"
                onSubmitEditing={() => compare()}
              />
            </View>

            {error === true ? (
              <View style={styles.formbox}>
                <Text style={styles.error}>비밀번호가 일치하지 않습니다.</Text>
              </View>
            ) : null}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  formBox: {
    marginTop: 24,
    marginHorizontal: 24,
  },
  textInput: {
    fontSize: 14,
    color: "#666666",
    height: 36,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
  },
  bigText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500",
    color: "#000000",
  },

  error: {
    fontSize: 16,
    fontWeight: "500",
    color: "red",
  },
  
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginTop: 100,
  },
  button: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 60,
    backgroundColor: "#15b6f1",
    alignItems: "center",
    justifyContent: "center",
  },
  buttontext: {
    fontSize: 16,
    fontWeight: "500",
    color: "#ffffff",
  },
  spinnerTextStyle: {
    color: "#FFF",
  },
});

export default SignUpStartScreen;
