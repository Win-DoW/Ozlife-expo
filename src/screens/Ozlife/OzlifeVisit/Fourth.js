import React, { useEffect, useState, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from './styles';

const Fourth = ({ navigation, route }) => {

  const next = async () => {
    try {
      navigation.navigate('Fifth', {
        ...route.params,
        visit_date: date
      });
    } catch (error) {
      console.log('error :', error);
    }
  }
  
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.formbox}>
        <Text style={styles.text}>방문날짜 설정</Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChange}
          style={{marginTop: 20}}
        />
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChange}
          style={{marginTop: 10}}
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
