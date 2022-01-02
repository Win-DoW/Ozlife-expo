import React, { useState, useEffect } from 'react';
import {  Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, LogBox } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { Auth, API, graphqlOperation } from 'aws-amplify';

import { getUserOnChatScreen } from 'graphql/custom'

import { ReturnChatRoomID, ToDo } from 'utils/Chat';

import Header from 'utils/Header';
import ChatRoomListItem from 'components/ChatComponents/ChatRoomListItem';

LogBox.ignoreLogs(['Setting a timer']);

const ChatScreen = ({ navigation, route }) => {

  // 채팅방 생성을 위한 변수들
  const userId = '3ee2134d-e833-4361-86c0-663ccaba21ef'
  const ownerId = '6ed09320-0fe2-46c6-b54d-05a92a9308b3'
  //

  const [chatRooms, setChatRooms] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchData();
    })

    return unsubscribe;
  }, [navigation])

  const fetchData = async() => {
    try {
      setLoading(true)
      const userKey = await Auth.currentAuthenticatedUser({bypassCache: false})
      const user = await API.graphql(graphqlOperation(getUserOnChatScreen, {
        id: userKey.attributes.sub
      }))

      setChatRooms(user.data.getUser.chatRoomUser.items)
      setLoading(false)
    } catch(e) {
      setLoading(false)
      console.log(e)
    }
  }

  // 채팅방 이동
  const goToChatRoom = () => {
    const result = ReturnChatRoomID(userId, ownerId).then(response => {
      navigation.navigate('ChatRoomScreen', {
        chatRoomId: response
      })
    })
  }
  // 채팅방 이동

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

      <Header
          title={'채팅'}
          noIcon={true}
      />

      <TouchableOpacity style={{height: 56, backgroundColor: 'yellow'}} onPress={goToChatRoom}>
        <Text style={styles.topBarText}>채팅방 생성</Text>
      </TouchableOpacity>

      <FlatList
        data={chatRooms}
        renderItem={({item}) => <ChatRoomListItem chatRoom={item.chatRoom} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: '#ffffff',
  },
  spinnerTextStyle: {
    color: '#FFF',
  }
})

export default ChatScreen;