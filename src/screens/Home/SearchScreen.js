import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Image, Pressable } from 'react-native';
import SearchBar from 'react-native-platform-searchbar';

import Ozlifer from 'components/Ozlifer'
import Ozlife from 'components/Ozlife'
import Store from 'components/Store'

import { API, graphqlOperation, Storage, Auth } from 'aws-amplify';
import { getUser, listUsers, listOzlives } from 'graphql/queries';
import { listStoresOnSearchScreen } from 'graphql/custom';

const SearchScreen = ({ navigation,  route }) => {

  const [loading, setLoading] = useState(false);  
  const [tabState, setTabState] = useState(0);
  const [user, setUser] = useState({});

  const [ozlifesAll, setOzlifesAll] = useState([]);
  const [ozlifes, setOzlifes] = useState([]);

  const [usersAll, setUsersAll] = useState([]);
  const [users, setUsers] = useState([]);

  const [storesAll, setStoresAll] = useState([]);
  const [stores, setStores] = useState([]);
  
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchData = async () => {
    try {      
      setLoading(true);
      setOzlifesAll([]);
      setUsersAll([]);
      setStoresAll([]);

      const userKey = await Auth.currentAuthenticatedUser({bypassCache: false});
      const userData = await API.graphql(graphqlOperation(getUser, { id: userKey.attributes.sub }));

      setUser(userData.data.getUser);

      const users = await API.graphql(graphqlOperation(listUsers));
      const ozlifes = await API.graphql(graphqlOperation(listOzlives));
      const stores = await API.graphql(graphqlOperation(listStoresOnSearchScreen));

      await Promise.all(users.data.listUsers.items.map(async (item, idx) => {
        const result = await Storage.get(item.image);
        const newUser = {...item, image: result};
        setUsersAll(users => [...users, newUser]);
      }))

      await Promise.all(stores.data.listStores.items.map(async (item, idx) => {
        const result = await Storage.get(item.images[0]);
        const newStore = {...item, image: result};
        setStoresAll(stores => [...stores, newStore]);
      }))

      await Promise.all(ozlifes.data.listOzlives.items.map(async (item, idx) => {
        const result = await Storage.get(item.images[0]);
        const newOzlife = {...item, image: result};
        setOzlifesAll(ozlifes => [...ozlifes, newOzlife]);
      }))

      setLoading(false);

    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  const searchItems = async () => {
    setUsers(usersAll.filter(x => 
      x.nickname.includes(search) || x.interest.includes(search)
    ))
    setOzlifes(ozlifesAll.filter(x => 
      x.name.includes(search) || x.title.includes(search) || x.tag.includes(search) || x.address.includes(search)
    ))
    setStores(storesAll.filter(x => 
      x.name.includes(search) || x.address.includes(search)
    ))
  }

  const nothing = () => {
    return (
      <View>
        { search !== '' &&
        <View style={styles. nothingContainer}>
          <Image style={styles.nothingIcon} source={require('../../assets/icon_logo.png')}/>
          <Text style={styles.nothingText}>검색된 항목이 없어요...</Text>
          <Text style={styles.nothingText}>아래의 키워드로 검색해보세요.</Text>
        </View>
        }
        {keywordScreen()}
      </View>
    )
  }

  const keywordScreen = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.title}>
          키워드
        </Text>
        <View style={styles.rowContainer}>
          <View style={styles.keywordContainer}>
            <Pressable onPress={() => setSearch('맛평가')}>
              <Image style={styles.keywordIcon} source={require('../../assets/keyword/icon_taste.png')}/>
            </Pressable>
            <Text style={styles.keywordText}>맛평가</Text>
          </View>
          <View style={styles.keywordContainer}>
            <Pressable onPress={() => setSearch('홍보/마케팅')}>
              <Image style={styles.keywordIcon} source={require('../../assets/keyword/icon_marketing.png')}/>
            </Pressable>
            <Text style={styles.keywordText}>홍보/마케팅</Text>
          </View>
          <View style={styles.keywordContainer}>
            <Pressable onPress={() => setSearch('메뉴개발')}>
              <Image style={styles.keywordIcon} source={require('../../assets/keyword/icon_menu.png')}/>
            </Pressable>
            <Text style={styles.keywordText}>메뉴개발</Text>
          </View>
          <View style={styles.keywordContainer}>
            <Pressable onPress={() => setSearch('인테리어')}>
              <Image style={styles.keywordIcon} source={require('../../assets/keyword/icon_interia.png')}/>
            </Pressable>
            <Text style={styles.keywordText}>인테리어</Text>
          </View>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.keywordContainer}>
            <Pressable onPress={() => setSearch('디자인')}>
              <Image style={styles.keywordIcon} source={require('../../assets/keyword/icon_design.png')}/>
            </Pressable>
            <Text style={styles.keywordText}>디자인</Text>
          </View>
          <View style={styles.keywordContainer}>
            <Pressable onPress={() => setSearch('정부지원사업')}>
              <Image style={styles.keywordIcon} source={require('../../assets/keyword/icon_goverment.png')}/>
            </Pressable>
            <Text style={styles.keywordText}>정부지원사업</Text>
          </View>
          <View style={styles.keywordContainer}>
            <Pressable onPress={() => setSearch('법률')}>
              <Image style={styles.keywordIcon} source={require('../../assets/keyword/icon_law.png')}/>
            </Pressable>
            <Text style={styles.keywordText}>법률</Text>
          </View>
          <View style={styles.keywordContainer}>
            <Pressable onPress={() => setSearch('회계')}>
              <Image style={styles.keywordIcon} source={require('../../assets/keyword/icon_money.png')}/>
            </Pressable>
            <Text style={styles.keywordText}>회계</Text>
          </View>
        </View>
        
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        placeholder="통합검색"
        cancelText="취소"
        onChangeText={(text) => setSearch(text)}
        value={search}
        onSubmitEditing={() => searchItems()}
        theme="light"
        platform="ios"
        style={{padding:20}}
      />

      <View style={styles.tabMenuContanier}>
        <View style={styles.tab}>
          <Pressable onPress={() => setTabState(0)} style={[styles.touch, tabState === 0 && styles.border]}>
            <Text style={styles.tabText}>오지랖</Text>
          </Pressable>
          <Pressable onPress={() => setTabState(1)} style={[styles.touch, tabState === 1 && styles.border]}>
            <Text style={styles.tabText}>사람</Text>
          </Pressable>
          <Pressable onPress={() => setTabState(2)} style={[styles.touch, tabState === 2 && styles.border]}>
            <Text style={styles.tabText}>가게</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.container}>
        <FlatList
          data={ tabState === 0 ? ozlifes : tabState === 1 ? users : stores }
          renderItem={({item}) => 
            tabState === 0 ?
            <Ozlife ozlife={item} userID={user.id} />
            : tabState === 1 ?
            <Ozlifer user={item} />
            :
            <Store store={item} userID={user.id} />
          }
          keyExtractor={(item) => item.id}
          ListEmptyComponent={nothing}
          contentContainerStyle={{marginTop: 20}}
        />
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', 
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 20,
  },
  keywordContainer: {
    alignItems: 'center', 
    justifyContent: 'center'
  },
  keywordIcon: {
    height: 60,
    width: 60,
  },
  keywordText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 4,
  },
  nothingContainer: {
    alignItems: 'center', 
    justifyContent: 'center'
  },
  nothingIcon: {
    width: 70,
    height: 70,
    marginBottom: 8,
  },
  nothingText: {
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    margin: 20,
  },
  tabMenuContanier: {
    paddingHorizontal: 20,
    borderColor: "#dddddd",
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  tab: {
    flexDirection: 'row',
    width: '100%',
    height: 50,
  },
  touch: {
    flex: 1,
    marginVertical: 2,
    alignItems: 'center', 
    justifyContent: 'center'
  },
  border: {
    borderBottomColor: '#15b6f1',
    borderBottomWidth: 3
  },
  tabText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default SearchScreen;