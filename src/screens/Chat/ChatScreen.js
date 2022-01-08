import React, { useState, useEffect } from 'react';
import {  View, Text, SafeAreaView, StyleSheet, FlatList, LogBox, Dimensions } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Auth, API, graphqlOperation } from 'aws-amplify';

import { getUserOnChatScreen } from 'graphql/custom'

import Header from 'utils/Header';
import ChatRoomListItem from 'components/ChatComponents/ChatRoomListItem';

const windowHeight = Dimensions.get('window').height;

LogBox.ignoreLogs(['Setting a timer']);

const ChatScreen = ({ navigation, route }) => {

  const [chatRooms, setChatRooms] = useState([])
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    })

    return unsubscribe;
  }, [navigation])

  const fetchData = async() => {
    try {
      setVisible(true)
      const userKey = await Auth.currentAuthenticatedUser({bypassCache: false})
      const user = await API.graphql(graphqlOperation(getUserOnChatScreen, {
        id: userKey.attributes.sub
      }))

      setChatRooms(user.data.getUser.chatRoomUser.items)
      setVisible(false)
    } catch(e) {
      setVisible(false)
      console.log(e)
    }
  }

  const EmptyChatRoom = () => {
    return (
      <View>
        <View style={styles.emptyBox}>
          <MaterialCommunityIcons name="chat-remove-outline" size={40} color="#dddddd" />
        </View>
        <View style={{marginTop: 25}}>
          <Text style={styles.emptyText}>채팅방이 존재하지 않습니다</Text>
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
          title={'채팅'}
          noIcon={true}
      />

      <FlatList
        data={chatRooms}
        renderItem={({item}) => <ChatRoomListItem chatRoom={item.chatRoom} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={EmptyChatRoom}
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
  }
})

export default ChatScreen;