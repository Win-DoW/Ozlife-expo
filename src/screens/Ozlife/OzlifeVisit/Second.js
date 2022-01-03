import React, { useEffect, useState, useRef } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, Text, ScrollView, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from 'utils/Header';
import styles from './styles';

const Second = ({ navigation, route }) => {

  const [count, setCount] = useState(0);
  const [question, setQuestion] = useState([]);  

  const next = async () => {
    try {
      navigation.navigate('Third', {
        ...route.params,
        question
      });
    } catch (error) {
      console.log('error :', error);
    }
  }

  const plus = () => {
    setCount(count+1);
    setQuestion(question => [...question, ''])
  }

  const change = (value, index) => {
    let questions = question;
    questions[index] = value;
    setQuestion(questions);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>

          <AppHeader
            title={"방문 온라인 피드백"}
            noIcon={false}
            leftIcon={<Ionicons name="chevron-back-outline" size={32} color="black" />}
            leftIconPress={() => navigation.goBack()}
          />

          <ScrollView>

            <View style={styles.formbox}>
              <Text style={styles.text}>질문 목록 작성</Text>
              <Text style={{fontSize: 14, marginTop: 4, color: '#aaaaaa' }}>
                💡질문이 구체적일수록 양질의 답변을 받을 수 있습니다.
              </Text>
            </View>        

            {[...Array(count)].map((n, index) => {
              return (
                <View style={styles.formbox} key={index}>
                  <Text style={styles.text}>Q{index+1}</Text>
                  <TextInput
                    style={styles.textinput}
                    placeholder="질문을 입력해주세요."
                    onChangeText = {(value) => change(value, index)}
                  />
                </View>
              )
            })}

            <View style={styles.formbox}>
              <TouchableOpacity onPress={plus} style={{borderWidth: 2, borderColor: '#15b6f1', padding: 16, justifyContent: 'center', alignItems: 'center'}}>
                <Text key={count} style={{color: '#15b6f1', fontSize: 16, fontWeight: 'bold'}}>+ 질문 추가하기</Text>
              </TouchableOpacity>
            </View>
            
          </ScrollView>

          <View style={styles.bottom}>
            <TouchableOpacity onPress={next} style={styles.button}>
              <Text style={styles.buttontext}>다음</Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Second;
