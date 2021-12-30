import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import { Auth, API, graphqlOperation, Storage } from 'aws-amplify';
// import { getUser } from '../../graphql/queries';

// 채팅방 생성을 위한
import { getUser } from './graphql/queries'
import { listChatRoomUsersSearch } from './graphql/queries'
import { createChatRoom, createChatRoomUser } from '../../graphql/mutations';
// 채팅방 생성을 위한

import ChatRoomListItem from '../../components/ChatComponents/ChatRoomListItem';

const ChatScreen = ({ navigation, route }) => {

  // 채팅방 생성을 위한 변수들
  const userId = '3ee2134d-e833-4361-86c0-663ccaba21ef'
  const ownerId = '6ed09320-0fe2-46c6-b54d-05a92a9308b3'
  //

  const [chatRooms, setChatRooms] = useState([])
  const [loading, setLoading] = useState(false);
  const [myImage, setMyImage] = useState('');

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
      const fetchUserData = await API.graphql(graphqlOperation(getUser, {
        id: userKey.attributes.sub
      }))
      const fetchImage = await Storage.get(fetchUserData.data.getUser.image)
      setMyImage(fetchImage)
      setChatRooms(fetchUserData.data.getUser.chatRoomUser.items)
      setLoading(false)
    } catch(e) {
      setLoading(false)
      console.log(e)
    }
  }

  // 채팅방 생성 테스트 구간
  const startToChatting = async () => {
    // '채팅 시작'등 과 같은 버튼을 클릭했을 경우를 의미
    try {
      // 채팅을 시작할 때 그 사람과의 채팅방이 존재하는지 확인
      // 존재하면 그 채팅방으로 이동
      // 존재하지 않으면 새로운 채팅방 생성 후 이동
      const existChatRoom = await API.graphql(
        graphqlOperation(listChatRoomUsersSearch, {
          filter: {
            userID: { eq: userId },
            otherUserID: { eq: ownerId },
          },
        })
      );

      if (existChatRoom.data.listChatRoomUsers.items.length !== 0) {
        // 채팅방이 존재하면 존재하는 채팅방으로 이동하는 과정
        console.log("Exist");

        navigation.navigate("ChatRoomScreen", {
          id: existChatRoom.data.listChatRoomUsers.items[0].chatRoomID,
          name: '이름',
        });
      } else {
        // 채팅방이 존재하지 않으면 새로운 채팅방을 생성하는 과정
        console.log("No");
        // 1. 우선 채팅이 이루어지는 새로운 채팅방을 생성한다.
        // 추후 작업으로는 그 사람과의 채팅방이 이미 존재하는 경우 그 채팅방으로 이동하도록
        const newChatRoomData = await API.graphql(
          graphqlOperation(createChatRoom, {
            input: {
              lastMessageID: "zz753fca-e8c3-473b-8e85-b14196e84e16", // 필수로 ID를 넣어줘야하는데 임의의 ID로 생성
              messagesCount: 0, // 초기에 쌓인 메세지는 0개를 의미
            },
          })
        );

        if (!newChatRoomData.data) {
          console.log("Failed to create a chat room");
          return;
        } // 채팅방 생성에 실패한 경우를 의미

        const newChatRoom = newChatRoomData.data.createChatRoom; // 새로 생성된 채팅방에 대한 실질적인 데이터를 의미

        // 2. 채팅이 이루어지는 상대를 채팅방에 추가시켜서 인식
        // 즉 생성된 채팅방과 유저를 이어주는 ChatRoomUser를 만드는 단계

        await API.graphql(
          graphqlOperation(createChatRoomUser, {
            input: {
              userID: ownerId,
              otherUserID: userId,
              chatRoomID: newChatRoom.id,
            },
          })
        );

        // 3. 채팅을 시작한 유저를 채팅방에 추가시켜서 인식
        // 즉 생성된 채팅방과 유저를 이어주는 ChatRoomUser를 만드는 단계

        await API.graphql(
          graphqlOperation(createChatRoomUser, {
            input: {
              userID: userId,
              otherUserID: ownerId,
              chatRoomID: newChatRoom.id,
            },
          })
        );

        navigation.navigate("ChatRoomScreen", {
          id: newChatRoom.id,
          name: '이름',
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  // 채팅방 생성 테스트 구간

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

      <View style={styles.topBar}>
        <Text style={styles.topBarText}>채팅</Text>
      </View>

      <TouchableOpacity style={{height: 56, backgroundColor: 'yellow'}} onPress={startToChatting}>
        <Text style={styles.topBarText}>채팅방 생성</Text>
      </TouchableOpacity>

      <FlatList
        data={chatRooms}
        renderItem={({item}) => <ChatRoomListItem chatRoom={item.chatRoom} image={myImage}/>}
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
  topBar: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center'
  },
  topBarText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
})

export default ChatScreen;