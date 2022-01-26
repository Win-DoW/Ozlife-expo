import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, FlatList} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from 'utils/Header';
import { Auth, API, graphqlOperation, Storage } from 'aws-amplify'
import { getUserOnProfileScreen } from 'graphql/custom'
import Store from 'components/Store'
import AnimatedLoader from 'react-native-animated-loader';

const OzlifeSelectScreen = ({ navigation, route }) => {

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
      const stores = user.storeItem.items;

      setUser(user);

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

  return (
    <SafeAreaView style={styles.container}>

      <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../../utils/Loader.json")}
        animationStyle={{ width: 300, height: 300 }}
        speed={1}
      />

      <AppHeader
        title={"오지랖 요청하기"}
        noIcon={false}
        leftIcon={<Ionicons name="chevron-back-outline" size={32} color="black" />}
        leftIconPress={() => navigation.goBack()}
      />
      <View style={styles.formbox}>
          <Text style={styles.text}>오지랖이 필요한 가게를 선택해주세요.</Text>
      </View>

      <FlatList
        data={stores}
        renderItem={({item}) => <Store store={item} userID={user.id} userReviews={user.reviewItem.items} state={false} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{marginTop: 20}}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'flex-start', 
    backgroundColor: '#FFFFFF'
  },  
  formbox: {
    marginTop: 30,
    marginHorizontal: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  ozlifeButtonPress: {
    width: '100%',
    height: 80, 
    marginVertical: 16, 
    alignItems: 'center', 
    backgroundColor: '#15b6f1', 
    borderRadius: 10, 
    justifyContent: 'center'
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 100,
  },
  button: {
    height: 60,
    backgroundColor: '#15b6f1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttontext: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff'
  },
});

export default OzlifeSelectScreen;