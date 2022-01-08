import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Header from 'utils/Header';

const windowHeight = Dimensions.get('window').height;

const AlarmScreen = ({ navigation, route }) => {

  const [alarm, setAlarm] = useState([])

  const AlarmListItem = ({data}) => {
    return (
      <View></View>
    )
  }

  const EmptyAlarm = () => {
    return (
      <View>
        <View style={styles.emptyBox}>
          <Ionicons name="ios-notifications-off-outline" size={40} color="#dddddd" />
        </View>
        <View style={{marginTop: 25}}>
          <Text style={styles.emptyText}>알림이 존재하지 않습니다</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>

      <Header
          title={'알림'}
          noIcon={true}
      />

      <FlatList
        data={alarm}
        renderItem={({item}) => <AlarmListItem data={item}/>}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyAlarm}
      />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: '#ffffff',
  },
  emptyBox: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#dddddd',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: windowHeight * 0.15
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666666',
    alignSelf: 'center'
  }
})

export default AlarmScreen;