import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';

import { Auth, API, graphqlOperation, Storage } from 'aws-amplify'
import { getUserOnProfileScreen } from 'graphql/custom'

import RegisteredStoreInProfile from 'components/ProfileComponents/RegisteredStoreInProfile';

const ProfileScreen = ({ navigation, route }) => {

  const [user, setUser] = useState({})
  const [store, setStores] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData()
    })

    return unsubscribe;
  }, [navigation])

  const fetchData = async() => {
    try {
      setLoading(true)

      const userKey = await Auth.currentAuthenticatedUser({bypassCache: false})
      const userData = await API.graphql(graphqlOperation(getUserOnProfileScreen, {
        id: userKey.attributes.sub
      }))
      const user = userData.data.getUser;
      const image = await Storage.get(user.image);

      setUser({...user, image});
      setStores(user.storeItem.items)

      setLoading(false)
    } catch (e) {
      setLoading(false)
      console.log(e)
    }
  }

  const goToSetting = () => {
    navigation.navigate('ProfileSettingScreen', {
      name: user.nickname
    });
  }

  const ProfileContent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.userProfileBox}>
          <Image
            source={{ uri: user.image }}
            style={styles.profileImage}
          />

          <View style={styles.userProfileData}>
            <Text style={{ fontSize: 12, color: "#aaaaaa", lineHeight: 17 }}>
              전문 오지라퍼
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "500", lineHeight: 29 }}>
              {user.nickname}
            </Text>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Ionicons name="ios-heart-sharp" size={24} color="#ff4444" />
              <Text style={{ fontSize: 12, fontWeight: "500", color: "#ff4444", marginLeft: 4 }}>
                1231
              </Text>
              <TouchableOpacity style={{ paddingHorizontal: 6, paddingVertical: 6 }}>
                <Text style={{ fontSize: 12, fontWeight: "500", color: "#aaaaaa" }}>
                  찜목록
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
  
        <View style={styles.selfInfo}>
          <Text style={styles.sectionTitleText}>
            자기소개
          </Text>
          <View style={{ marginTop: 8 }}>
            <Text style={{fontSize: 14}}>
              {user.profile}
            </Text>
          </View>
        </View>
  
        <View style={styles.keyword}>
          <Text style={styles.sectionTitleText}>
            키워드
          </Text>
          <View style={{ marginTop: 8 }}>
            <Text style={styles.keywordTagText}>
              #{user.interest}
            </Text>
          </View>
        </View>
  
        { store.length > 0 ?
          <View style={styles.storeInfo}>
            <Text style={styles.sectionTitleText}>
              가게정보
            </Text>
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

      <View style={styles.headerBox}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            내 프로필
          </Text>

          <TouchableOpacity style={{ paddingHorizontal: 5, paddingVertical: 5 }} onPress={goToSetting}>
            <Ionicons name="settings-outline" size={24} color="#777777" />
          </TouchableOpacity>
      </View>

      <FlatList
        ListHeaderComponent={ProfileContent}
        data={store}
        renderItem={({ item }) => <RegisteredStoreInProfile store={item} navigation={navigation}/>}
        keyExtractor={(item) => item.id}
        style={{ marginBottom: 10 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerBox: {
    flexDirection: "row",
    height: 56,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 10,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
  },
  userProfileBox: {
    marginTop: 16,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 16,
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
  },
  profileImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  userProfileData: {
    height: 88,
    marginLeft: 16,
    justifyContent: 'center'
  },
  selfInfo: {
    marginTop: 16,
    marginHorizontal: 20,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 27
  },
  keyword: {
    marginTop: 24,
    marginHorizontal: 20,
  },
  keywordTagText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '300',
    color: '#aaaaaa'
  },
  storeInfo: {
    marginTop: 24,
    marginHorizontal: 20,
    marginBottom: 8
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

export default ProfileScreen;