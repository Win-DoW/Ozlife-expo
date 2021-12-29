import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView, Image, Pressable } from 'react-native';
import Ozlife from '../../components/Ozlife'

import { API, graphqlOperation, Storage, Auth } from 'aws-amplify';
import { getUser, listOzlives } from '../../graphql/queries';

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
          <Image style={{height: 30, width: 100}} source={require('../../assets/images/image-main-ozlife.png')}/>
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
          <Pressable style={styles.searchBar} onPress={() => navigation.navigate('SearchScreen')}>
            <Image style={styles.searchIcon} source={require('../../assets/BottomTabIcons/find_2.png')}/>
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
        renderItem={({item}) => <Ozlife ozlife={item} userId={user.id} />}
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