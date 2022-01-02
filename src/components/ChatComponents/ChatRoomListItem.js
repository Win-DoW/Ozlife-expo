import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";

import { Auth, Storage } from "aws-amplify";

const ChatRoomListItem = ({ chatRoom }) => {

  const navigation = useNavigation();

  const [myId, setMyId] = useState(""); // 상대방과 구분되는 나의 ID를 저장
  const [pressIn, setPressIn] = useState(false);
  const [otherUser, setOtherUser] = useState({}); // 나와 채팅하고자 하는 다른 상대방에 대한 정보 저장

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const userKey = await Auth.currentAuthenticatedUser({bypassCache: false,});
      if (chatRoom.chatRoomUsers.items[0].user.id === userKey.attributes.sub) {
        setMyId(userKey.attributes.sub);
        const image = await Storage.get(chatRoom.chatRoomUsers.items[1].user.image)
        setOtherUser({...chatRoom.chatRoomUsers.items[1].user, image});
      } else {
        setMyId(userKey.attributes.sub);
        const image = await Storage.get(chatRoom.chatRoomUsers.items[0].user.image)
        setOtherUser({...chatRoom.chatRoomUsers.items[0].user, image});
      } // 나와 다른 상대방과 채팅하므로 내가 아닌 상대방을 otherUser로 등록하는 작업
    } catch (e) {
      console.log(e);
    }
  };

  const goToChatRoom = () => {
    navigation.navigate("ChatRoomScreen", {
      chatRoomId: chatRoom.id,
    });
  };

  if (!otherUser) {
    return null;
  } // otherUser에 대한 정보가 저장되지 않았으면 return

  return (
    <Pressable
      style={{backgroundColor: pressIn ? "rgba(21, 182, 241, 0.15)" : "#ffffff" }}
      onPress={goToChatRoom}
      onPressIn={() => setPressIn(true)}
      onPressOut={() => setPressIn(false)}
    >
      <View style={styles.container}>
        <Image
          source={{ uri: otherUser.image }}
          style={styles.otherImage}
        />

        <View style={{ flex: 1, height: 56, marginRight: 12 }}>
          <Text style={styles.nameText}>{otherUser.nickname}</Text>
          <Text style={styles.contentText} numberOfLines={2}>
            {chatRoom.lastMessage ? chatRoom.lastMessage.content : null}
          </Text>
        </View>

        <View style={styles.lastMessageInfoBox}>
          <Text style={styles.timeText}>
            {
              chatRoom.lastMessage ?
              moment(chatRoom.lastMessage.updatedAt).format("MM/DD HH:mm")
              :
              null
            }
          </Text>
          <Text>
            {chatRoom.lastMessage && chatRoom.lastMessage.userID === myId ?
              null
              :
              chatRoom.messagesCount === 0 ?
              null
              :
              <View style={styles.messageCountBox}>
                <Text style={styles.messageCountText}>
                  {chatRoom.messagesCount}
                </Text>
              </View>
            }
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 13,
    marginHorizontal: 20,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  otherImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12
  },
  nameText: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 20
  },
  contentText: {
    fontSize: 14,
    color: '#777777',
  },
  messageCountBox: {
    height: 20,
    width: 20,
    backgroundColor: '#ff4444',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  messageCountText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  timeText: {
    fontSize: 12,
    fontWeight: '300',
    color: '#aaaaaa',
    lineHeight: 18,
    marginBottom: 4
  },
  lastMessageInfoBox: {
    alignItems: 'flex-end'
  }
});

export default ChatRoomListItem;
