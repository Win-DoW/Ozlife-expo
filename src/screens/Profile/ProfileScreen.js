import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Pressable, Image, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfileRegisterStore from '../../components/ProfileRegisterStore';

import StoreInfoData from '../../data/StoreInfoData';

const ProfileScreen = ({ navigation, route }) => {

  const [stores, setStores] = useState([1])

  const profileMain = () => {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <View style={{ flex: 2, justifyContent: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 20 }}>내 프로필</Text>
          </View>
          <View style={{ flex: 0.5, flexDirection: "row", justifyContent: "flex-end",}}>
            <Pressable style={{ marginRight: 15 }}>
              <Ionicons name="settings-outline" size={24} color="#777777" />
            </Pressable>
          </View>
        </View>
  
        <View style={styles.mainprofile}>
          <Image source={require('../../assets/dog1.jpg')} style={styles.profileimage} />
          <View style={{ height: 88, marginLeft: 16, justifyContent: "center" }}>
            <Text style={{ fontSize: 12, color: "#aaaaaa" }}>전문 오지라퍼</Text>
            <Text style={{ fontSize: 20, fontWeight: "500", marginVertical: 5 }}>최우창</Text>
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
          <Text style={{fontSize: 14}}>안녕하세요 저는 이 시대 최고의 코딩능력을 가지고 있는 최우창이에요. 취미는 코딩이고 특기는 코딩이에요. 잘부탁드립니다.</Text>
        </View>
  
        <View style={styles.keyword}>
          <Text style={styles.mainfont}>키워드</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.keywordtext}>#브랜딩 #종합 #인테리어 #홍보마케팅</Text>
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
      <FlatList
        ListHeaderComponent={profileMain}
        data={StoreInfoData}
        renderItem={({item}) => <ProfileRegisterStore store={item} />}
        keyExtractor={(item) => item.id}
        style={{marginBottom: 25}}
      />
    </SafeAreaView>
  )
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
});

export default ProfileScreen;