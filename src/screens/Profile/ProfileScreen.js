import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Auth, API, graphqlOperation, Storage } from 'aws-amplify'
import { getUserOnProfileScreen } from 'graphql/custom'
import Store from 'components/Store'
import AnimatedLoader from 'react-native-animated-loader';

const ProfileScreen = ({ navigation, route }) => {

  const [user, setUser] = useState({})
  const [stores, setStores] = useState([])
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData()
    })

    return unsubscribe;
  }, [navigation])

  const fetchData = async() => {
    try {
      setVisible(true);
      setStores([]);

      const userKey = await Auth.currentAuthenticatedUser({bypassCache: false})
      const userData = await API.graphql(graphqlOperation(getUserOnProfileScreen, {
        id: userKey.attributes.sub
      }))
      const user = userData.data.getUser;
      const image = await Storage.get(user.image);
      const stores = user.storeItem.items;

      setUser({...user, image});

      await Promise.all(stores.map(async (item, idx) => {
        const result = await Storage.get(item.images[0]);
        const newStore = {...item, image: result};
        setStores(stores => [...stores, newStore]);
      }))

      setVisible(false);
    } catch (e) {
      setVisible(false);
      console.log(e)
    }
  }

  const goToSetting = () => {
    navigation.navigate('ProfileSettingScreen', {
      user: user
    });
  }
  
  console.log(user)

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
  
        { stores.length > 0 ?
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
      
      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("utils/Loader.json")}
        animationStyle={{ width: 300, height: 300 }}
        speed={1}
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
        data={stores}
        renderItem={({item}) => <Store store={item} userID={user.id} userReviews={user.reviewItem.items} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{marginTop: 20}}
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
});

export default ProfileScreen;