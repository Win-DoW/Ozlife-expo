import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import AppHeader from 'utils/Header';
import styles from './styles';

const Third = ({ navigation, route }) => {

  const [member, setMember] = useState(8);
  const next = async () => {
    try {
      navigation.navigate('Fourth', {
        ...route.params,
        member: member
      });
    } catch (error) {
      console.log('error :', error);
    }
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

          <View style={styles.formbox}>
            <Text style={styles.text}>몇 명의 답변을 받고 싶나요?</Text>
            <Text style={{fontSize: 14, marginTop: 4, color: '#aaaaaa' }}>
              💡부적절한 답변은 신고할 수 있습니다.
            </Text>
          </View>

          <View style={styles.formbox}>
            <Text style={styles.text}>답변할 인원 수</Text>
            <TextInput 
              keyboardType = 'numeric'
              style={styles.textinput}
              onChangeText={(value) => setMember(value)}
            />
          </View>

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

export default Third;
