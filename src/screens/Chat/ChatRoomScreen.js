import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, FlatList, Image, TouchableOpacity, TextInput } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { Ionicons } from '@expo/vector-icons';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { messagesByChatRoom, getChatRoom } from 'graphql/queries';
import {
  createMessage,
  updateChatRoom,
  deleteChatRoom,
  deleteChatRoomUser
} from 'graphql/mutations';
import {
  getUserOnProfileInformationEditScreen,
  getChatRoomCountOnChatRoomScreen,
  getChatRoomLastOnChatRoomScreen,
  updateChatRoomCountOnChatRoomScreen } from 'graphql/custom'

import Header from "utils/Header";
import ChatMessage from "components/ChatComponents/ChatMessage";

const ChatRoomScreen = ({ navigation, route }) => {

  const chatRoomId = route.params.chatRoomId;
  const otherUserName = route.params.otherUserName;
  
  const [user, setUser] = useState({})
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
      fetchMessages();
    });

    return unsubscribe;
  }, [navigation]);

  // 채팅방 나갈 때 상호간에 메세지 전송이 없었다면 그 채팅방은 삭제
  useEffect(() => {
    const checkChatRoomLastMessage = async() => {
      try {
        const chatRoomData = await API.graphql(graphqlOperation(getChatRoom, {
          id: chatRoomId
        }))

        if(!chatRoomData.data.getChatRoom.lastMessage) {
          removeChatRoomUser(chatRoomData.data.getChatRoom.chatRoomUsers.items[0].id);
          removeChatRoomUser(chatRoomData.data.getChatRoom.chatRoomUsers.items[1].id);
          removeChatRoom();
          console.log('채팅방 삭제!')
        }
      } catch(e) {
        console.log(e)
      }
    }

    return () => {
      checkChatRoomLastMessage();
    }
  }, [])

  // 채팅방 나갈 때
  // 마지막 메세지 내가 보낸 경우 Count 그대로
  // 마지막 메세지 내가 보낸 경우 아닌 경우 Count 0
  useEffect(() => {
    const checkLastMessage = async() => {
      try {
        const lastMessageUserId = await API.graphql(graphqlOperation(getChatRoomLastOnChatRoomScreen, {
          id: chatRoomId
        }))

        // 존재할 때 체크해서 변경
        if(lastMessageUserId.data.getChatRoom.lastMessage && lastMessageUserId.data.getChatRoom.lastMessage.userID !== user.id) {
          await API.graphql(graphqlOperation(updateChatRoomCountOnChatRoomScreen, {
            input: {
              id: chatRoomId,
              lastMessageID: lastMessageUserId.data.getChatRoom.lastMessageID,
              messagesCount: 0
            }
          }))
        }

        return () => {
          checkLastMessage();
        }
      } catch(e) {
        console.log(e)
      }
    }
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const userKey = await Auth.currentAuthenticatedUser({bypassCache: false})
      const user = await API.graphql(graphqlOperation(getUserOnProfileInformationEditScreen, {
        id: userKey.attributes.sub
      }))
      const image = await Storage.get(user.data.getUser.image)
      setUser({...user.data.getUser, image})
      setLoading(false)
    } catch (e) {
      console.log("실패")
      setLoading(false)
      console.log(e);
    }
  };

  const fetchMessages = async() => {
    try {
      const messagesInChatRoom = await API.graphql(graphqlOperation(messagesByChatRoom, {
        chatRoomID: chatRoomId,
        sortDirection: "DESC"
      }))
      console.log("이전 메세지 불러오기 성공")
      setMessages(messagesInChatRoom.data.messagesByChatRoom.items)

    } catch(e) {
      console.log(e)
    }
  }

  const sendMessage = async() => {
    try {
      // 공백만 있는 경우가 아니라면 메세지 작성 가능
      if(inputMessage.replace(/(\s*)/g, "") != '') {
        const newMessageData = await API.graphql(graphqlOperation(createMessage, {
          input: {
            userID: user.id,
            chatRoomID: chatRoomId,
            content: inputMessage
          }
        }))
  
        await updateChatRoomLastMessage(newMessageData.data.createMessage.id);
        fetchMessages();
      }
    } catch(e) {
      console.log(e)
    } finally {
      setInputMessage('');
    }
  }

  // 메세지 보내기 눌렀을 때 마지막 메세지 업데이트 해주는 함수
  const updateChatRoomLastMessage = async(messageId) => {
    try {
      // 현재 채팅방의 읽지 않은 메세지 개수 불러오기
      const chatRoomData = await API.graphql(graphqlOperation(getChatRoomCountOnChatRoomScreen, {
        id: chatRoomId
      }))

      // 메세지가 존재하는지 여부 확인
      if(chatRoomData.data.getChatRoom.lastMessage) {
        await API.graphql(graphqlOperation(updateChatRoom, {
          input: {
            id: chatRoomId,
            lastMessageID: messageId,
            messagesCount: chatRoomData.data.getChatRoom.lastMessage.userID === user.id ?
            chatRoomData.data.getChatRoom.messagesCount + 1 : 1
            // 마지막 메세지가 내가 보낸 것이라면 + 1
            // 내가 보낸 메세지가 아니라면 읽은 경우가 되고 다시 보내게 되는 경우이므로 1로 초기화
          }
        }))
      } else {
        await API.graphql(graphqlOperation(updateChatRoom, {
          input: {
            id: chatRoomId,
            lastMessageID: messageId,
            messagesCount: 1
          }
        }))
      }
    } catch(e) {
      console.log(e)
    }
  }

  const goToBack = () => {
    navigation.pop();
  };

  // 안드로이드인지 iOS인지 체크해주는 함수
  const checkAndroid = () => {
    if(Platform.OS !== 'ios') {
      return true;
    } else {
      return false;
    }
  }

  // 채팅방 삭제하는 함수
  const removeChatRoom = async() => {
    try {
      await API.graphql(graphqlOperation(deleteChatRoom, {
        input: {
          id: chatRoomId
        }
      }))
    } catch(e) {
      console.log(e)
    }
  }

  // 채팅방과 연결된 유저 삭제하는 함수
  const removeChatRoomUser = async(userId) => {
    try {
      await API.graphql(graphqlOperation(deleteChatRoomUser, {
        input: {
          id: userId
        }
      }))
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null }
    >
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
          title={otherUserName}
          noIcon={false}
          leftIcon={<Ionicons name="chevron-back-outline" size={32} color="#000000" />}
          leftIconPress={goToBack}
        />

        <View style={{ backgroundColor: 'rgba(21, 182, 241, 0.3)', flex: 1 }}>
          <FlatList
            data={messages}
            renderItem={({item}) => <ChatMessage message={item} myId={user.id}/>}
            inverted
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={{...styles.bottomBox, paddingTop: checkAndroid() ? 0 : 14}}>
          <Image
            source={{ uri: user.image }}
            style={styles.bottomImage}
          />
          <TextInput
            style={styles.textInput}
            placeholder="채팅을 입력해주세요."
            placeholderTextColor='#cccccc'
            multiline={true}
            numberOfLines={2}
            value={inputMessage}
            onChangeText={(text) => setInputMessage(text)}
          />
          <TouchableOpacity onPress={sendMessage}>
            <Image
              source={require('../../assets/images/button-chat.png')}
              style={styles.bottomBtn}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  bottomBox: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    paddingLeft: 12,
    paddingRight: 8,
    alignItems: 'center',
    flexDirection: 'row'
  },
  bottomImage: {
    height: 24,
    width: 24,
    borderRadius: 12
  },
  bottomBtn: {
    width: 32,
    height: 32,
    borderRadius: 4
  },
  textInput: {
    flex: 1,
    marginHorizontal: 8,
    paddingVertical: 8,
    fontSize: 14,
    lineHeight: 20,
  }
});

export default ChatRoomScreen;
