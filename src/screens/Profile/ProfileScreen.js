import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Image, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';

import { Auth, API, graphqlOperation, Storage } from 'aws-amplify'
import { getUser } from '../../graphql/queries'

import ProfileRegisterStore from '../../components/ProfileComponents/ProfileRegisterStore';

const ProfileScreen = ({ navigation, route }) => {

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUserData()
    })

    return unsubscribe;
  }, [navigation])

  const [userData, setUserData] = useState({})
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(false);

  const fetchUserData = async() => {
    try {
      setLoading(true)
      const userKey = await Auth.currentAuthenticatedUser({bypassCache: false})
      let user = await API.graphql(graphqlOperation(getUser, {
        id: userKey.attributes.sub
      }))
      const image = await Storage.get(user.data.getUser.image)  
      user.data.getUser.image = image
      setUserData(user.data.getUser)
      setStores(user.data.getUser.storeItem.items)
      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  const goToSetting = () => {
    navigation.navigate('ProfileSettingScreen');
  }

  const profileMain = () => {
    return (
      <View style={styles.container}>
        <View style={styles.mainprofile}>
          <Image source={{ uri: userData.image }} style={styles.profileimage} />
          <View style={{ height: 88, marginLeft: 16, justifyContent: "center" }}>
            <Text style={{ fontSize: 12, color: "#aaaaaa" }}>전문 오지라퍼</Text>
            <Text style={{ fontSize: 20, fontWeight: "500", marginVertical: 5 }}>{userData.nickname}</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="ios-heart-sharp" size={24} color="#ff4444" />
              <Text style={{ fontSize: 12, fontWeight: "500", color: "#ff4444", marginRight: 6, }}>1231</Text>
              <Pressable>
                <Text style={{ fontSize: 12, fontWeight: "500", color: "#aaaaaa" }}>찜목록</Text>
              </Pressable>
            </View>
          </View>
        </View>
  
        <View style={styles.self_info}>
          <Text style={styles.mainfont}>자기소개</Text>
          <Text style={{fontSize: 14}}>{userData.profile}</Text>
        </View>
  
        <View style={styles.keyword}>
          <Text style={styles.mainfont}>키워드</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.keywordtext}># {userData.interest}</Text>
          </View>
        </View>
  
        { stores.length > 0 ?
          <View style={styles.storeinfo}>
            <Text style={styles.mainfont}>가게정보</Text>
          </View>
          :
          null
        } 
      </View>
    );
  }

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

      <View style={styles.title}>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>
            내 프로필
          </Text>
        </View>
        <View
          style={{
            flex: 0.5,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Pressable style={{ marginRight: 15 }} onPress={goToSetting}>
            <Ionicons name="settings-outline" size={24} color="#777777" />
          </Pressable>
        </View>
      </View>
      <FlatList
        ListHeaderComponent={profileMain}
        data={stores}
        renderItem={({ item }) => <ProfileRegisterStore store={item} navigation={navigation}/>}
        keyExtractor={(item) => item.id}
        style={{ marginBottom: 25 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  title: {
    flexDirection: "row",
    width: "100%",
    height: 56,
    backgroundColor: "white",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
  },
  mainprofile: {
    height: 120,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    marginBottom: 16,
  },
  profileimage: {
    width: 88,
    aspectRatio: 1 / 1,
    borderRadius: 100,
  },
  self_info: {
    marginHorizontal: 20,
    marginBottom: 24
  },
  mainfont: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  keyword: {
    marginHorizontal: 20,
    marginBottom: 24
  },
  keywordtext: {
    fontSize: 16,
    fontWeight: '300',
    marginRight: 5,
    color: '#aaaaaa'
  },
  storeinfo: {
    marginHorizontal: 20
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default ProfileScreen;