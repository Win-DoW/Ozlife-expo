import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from 'utils/Header';
import dayjs from "dayjs";
import styles from './styles';

const Fourth = ({ navigation, route }) => {
  const next = () => {
    navigation.navigate('Fifth', {
      ...route.params,
      visit_date: dayjs(date).format()
    });
  }
  
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>

      <AppHeader
        title={"방문 온라인 피드백"}
        noIcon={false}
        leftIcon={<Ionicons name="chevron-back-outline" size={32} color="black" />}
        leftIconPress={() => navigation.goBack()}
      />

      <View style={styles.formbox}>
        <Text style={styles.text}>방문날짜 설정</Text>

        <DateTimePicker
          loclae={'kr-ko'}
          testID="dateTimePicker"
          value={date}
          mode="date"
          format="YYYY-MM-DD"
          display={Platform.OS === 'ios' ? 'compact' : 'default'}
          onChange={onChange}
          style={{marginTop: 20}}
        />

        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onChange}
          style={{marginTop: 20}}
        />
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity onPress={next} style={styles.button}>
          <Text style={styles.buttontext}>다음</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

export default Fourth;
