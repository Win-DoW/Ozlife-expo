import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Dimensions, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import dayjs from "dayjs";
import AnimatedLoader from 'react-native-animated-loader';

import Header from 'utils/Header';

import { notificationByUser } from 'graphql/queries'
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';

const windowHeight = Dimensions.get('window').height;

const AlarmScreen = ({ navigation, route }) => {

  const [alarm, setAlarm] = useState([])
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setAlarm([])
      fetchData();
    })

    return unsubscribe;
  }, [navigation])

  const fetchData = async() => {
    try {
      setVisible(true)
      const userKey = await Auth.currentAuthenticatedUser({bypassCache: false})
      const alarmData = await API.graphql(graphqlOperation(notificationByUser, {
        userID: userKey.attributes.sub,
        sortDirection: "DESC"
      }))
      await Promise.all(alarmData.data.notificationByUser.items.map(async(item, idx) => {
        const image = await Storage.get(item.image)
        const result = {...item, image: image}
        setAlarm(alarm => [
          ...alarm,
          result
        ])
      }))
      setVisible(false)
    } catch(e) {
      setVisible(false)
      console.log(e)
    }
  }

  const AlarmListItem = ({data}) => {
    return (
      <View style={styles.alarmListContainer}>
        <View style={styles.alarmListBox}>
          <Image
            source={{uri: data.image}}
            style={{width: 56, height: 56, borderRadius: 5}}
            resizeMode='contain'
          />
          <View style={{height: 56, marginLeft: 12}}>
            <Text style={styles.alarmTitle}>{data.title}</Text>
            <Text style={styles.alarmContent}>{data.content}</Text>
            <Text style={styles.alarmTime}>{dayjs(data.createdAt).format('MM/DD hh:mm')}</Text>
          </View>
        </View>
      </View>
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

      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("utils/Loader.json")}
        animationStyle={{ width: 300, height: 300 }}
        speed={1}
      />

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
  },
  alarmListContainer: {
    paddingHorizontal: 20
  },
  alarmListBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1
  },
  alarmTitle: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  alarmContent: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
    color: '#777777',
  },
  alarmTime: {
    fontSize: 12,
    fontWeight: '300',
    color: '#aaaaaa',
  }
})

export default AlarmScreen;