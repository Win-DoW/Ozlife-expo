import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Image, Pressable, Platform } from 'react-native';
import Ozlife from 'components/Ozlife'

import { API, graphqlOperation, Storage, Auth } from 'aws-amplify';
import { getUser, listOzlives } from 'graphql/queries';

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import * as Device from 'expo-device';
import { SendNotification } from 'utils/Noti';

const HomeScreen = ({ navigation,  route }) => {

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [ozlifes, setOzlifes] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return () => {
      unsubscribe;
    }
  }, [navigation]);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, [])

  const registerForPushNotificationsAsync = async() => {
    try {
      let token;
      // 실제 디바이스에서만 동작
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        // 권한 부여 됬는지 확인 후 권한을 요청
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        // 아직까지 권한을 받지 못했다면 알림 푸시 토큰을 받지 못했다고 경고
        if (finalStatus !== 'granted') {
          console.log("Failed to get push token for push notification!")
          return;
        }

        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
      } else {
        // 에뮬레이터나 시뮬레이터인 경우
        console.log("Must use physical device for Push Notifications")
      }

      // 안드로이드의 경우 설정이 별도로 필요
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      return token;
    } catch(e) {
      console.log(e)
    }
  }

  const fetchData = async () => {
    try {      
      setLoading(true);
      setOzlifes([]);

      const userKey = await Auth.currentAuthenticatedUser({bypassCache: false});
      const userData = await API.graphql(graphqlOperation(getUser, { id: userKey.attributes.sub }));
      const ozlifes = await API.graphql(graphqlOperation(listOzlives, { filter: { address: { contains: userData.data.getUser.region }}}));

      setUser(userData.data.getUser);

      await Promise.all(ozlifes.data.listOzlives.items.map(async (item, idx) => {
        const result = await Storage.get(item.images[0]);
        const newOzlife = {...item, image: result};
        setOzlifes(ozlifes => [...ozlifes, newOzlife]);
      }))

      setLoading(false);

    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  const Main = () => {
    return (
      <View>

        <View style={styles.section}>
          <Image style={{height: 30, width: 100}} source={require('assets/images/image-main-ozlife.png')}/>
        </View>

        <Pressable style={{backgroundColor: 'red', height: 30}} onPress={() => SendNotification("ExponentPushToken[vCZ-7kI8MfqEUWJCEBBZKE]", "Hello", "MyFriend")}>
          <Text>Hello</Text>
        </Pressable>

        <View style={styles.section}>
          <Text style={styles.title}>
            {user.nickname}님 안녕하세요.
          </Text>
          <Text style={styles.title}>
            오늘도 많은 사람들이 기다리고 있어요!
          </Text>
        </View>

        <View style={styles.section}>
          <Pressable style={styles.searchBar} onPress={() => navigation.navigate('SearchScreen')}>
            <Image style={styles.searchIcon} source={require('assets/BottomTabIcons/find_2.png')}/>
            <Text style={styles.searchText}>통합검색</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>
            {user.region}의 오지랖
          </Text>
        </View>

      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={Main}
        data={ozlifes}
        renderItem={({item}) => <Ozlife ozlife={item} userID={user.id} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  section: {
    margin: 20,
  },
  searchBar: {
    borderRadius: 12,
    borderColor: '#15b6f1',
    borderWidth: 2,
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 12,
  },
  searchIcon: {
    height: 24,
    width: 24,
  },
  searchText: {
    color: '#aaaaaa',
    fontSize: 16,
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default HomeScreen;