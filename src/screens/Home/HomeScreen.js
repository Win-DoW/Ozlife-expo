import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Image, Pressable, Platform, LogBox } from 'react-native';
import Ozlife from 'components/Ozlife'
import dayjs from "dayjs";

import { API, graphqlOperation, Storage, Auth } from 'aws-amplify';
import { getUserOnHomeScreen, listOzlivesOnHomeScreen } from 'graphql/custom';
import { updateUser } from 'graphql/mutations'

import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import * as Device from 'expo-device';
import AnimatedLoader from 'react-native-animated-loader';

LogBox.ignoreLogs([`Constants.platform.ios.model has been deprecated in favor of expo-device's Device.modelName property.`]);

const HomeScreen = ({ navigation, route }) => {

  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState({});
  const [ozlifes, setOzlifes] = useState([]);
  const [userReviews, setUserReviews] = useState([]);

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
      } else {
        // 에뮬레이터나 시뮬레이터인 경우
        console.log("Must use physical device for Push Notifications")
      }

      // 안드로이드의 경우 설정이 별도로 필요
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "Ozlife",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      if(token) {
        const userKey = await Auth.currentAuthenticatedUser({bypassCache: false})
        await API.graphql(graphqlOperation(updateUser, {
          input: {
            id: userKey.attributes.sub,
            noti_token: token
          }
        }))
      } else {
        console.log('토큰이 존재하지 않습니다.')
      }
    } catch(e) {
      console.log(e)
    }
  }

  const fetchData = async () => {
    try {      
      setVisible(true);
      setOzlifes([]);

      const userKey = await Auth.currentAuthenticatedUser({bypassCache: false});
      const userData = await API.graphql(graphqlOperation(getUserOnHomeScreen, { id: userKey.attributes.sub }));
      const ozlifes = await API.graphql(graphqlOperation(listOzlivesOnHomeScreen, { filter: { address: { contains: userData.data.getUser.region }}}));
      const user = userData.data.getUser;

      setUser(user);
      setUserReviews(user.reviewItem.items)

      const current_date = dayjs().format();

      await Promise.all(ozlifes.data.listOzlives.items.map(async (item, idx) => {
        const visit_date = item.visit_date;
        const status = (visit_date.slice(0, 10) >= current_date.slice(0, 10));

        if (status) {
          const result = await Storage.get(item.images[0]);
          const newOzlife = { ...item, image: result };
          setOzlifes(ozlifes => [...ozlifes, newOzlife]);
        }
      }))

      setVisible(false);

    } catch (e) {
      setVisible(false);
      console.log(e);
    }
  }

  const Main = () => {
    return (
      <View>

        <View style={styles.section}>
          <Image style={{height: 30, width: 100}} source={require('assets/images/image-main-ozlife.png')}/>
        </View>

        <View style={styles.section}>
          <Text style={styles.title}>
            {user.nickname}님 안녕하세요.
          </Text>
          <Text style={styles.title}>
            오늘도 많은 사람들이 기다리고 있어요!
          </Text>
        </View>

        <View style={styles.section}>
          <Pressable style={styles.searchBar} onPress={() => navigation.navigate('SearchScreen', { user })}>
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
      
      {/* <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../../utils/Loader.json")}
        animationStyle={{ width: 300, height: 300 }}
        speed={1}
      /> */}

      <FlatList
        ListHeaderComponent={Main}
        data={ozlifes}
        renderItem={({item}) => <Ozlife ozlife={item} userID={user.id} userReviews={userReviews} />}
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