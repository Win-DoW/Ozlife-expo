import React, {useState, useEffect} from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import {
    Auth,
    Storage
} from 'aws-amplify';

const ChatListItem = ({ chatRoom, image }) => {

    const [myId, setMyId] = useState(null) // 상대방과 구분되는 나의 ID를 저장
    const [pressIn, setPressIn] = useState(false);
    const [profileImage, setProfileImage] = useState(''); // 나와 채팅하고자 하는 상대방 프로필 사진
    const [otherUser, setOtherUser] = useState(''); // 나와 채팅하고자 하는 다른 상대방에 대한 정보 저장

    useEffect(() => {
        const getOtherUser = async () => {
            try {
                const userInfo = await Auth.currentAuthenticatedUser();
                if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub) {
                    setMyId(userInfo.attributes.sub)
                    setOtherUser(chatRoom.chatRoomUsers.items[1].user)

                } else {
                    setMyId(userInfo.attributes.sub)
                    setOtherUser(chatRoom.chatRoomUsers.items[0].user)
                } // 나와 다른 상대방과 채팅하므로 내가 아닌 상대방을 otherUser로 등록하는 작업
            } catch(e) {
                console.log(e)
            }     
        }
        getOtherUser();
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const imageData = await Storage.get(otherUser.image)
                setProfileImage(imageData)
            } catch(e) {
                console.log(e)
            }
        }
        fetchData();
    }, [otherUser])

    const navigation = useNavigation();

    const goToChatRoom = () => {
        navigation.navigate("ChatRoomScreen" , {
            id: chatRoom.id,
            name: otherUser.nickname,
            image: profileImage,
            myImage: image
        })
    }

    if(!otherUser) {
        return null;
    } // otherUser에 대한 정보가 저장되지 않았으면 return

    return (
      <View style={{alignItems: 'center'}}>
        <Pressable
          style={[
            styles.press,
            {backgroundColor: pressIn ? 'rgba(21, 182, 241, 0.15)' : '#ffffff'},
          ]}
          onPress={goToChatRoom}
          onPressIn={() => setPressIn(true)}
          onPressOut={() => setPressIn(false)}>
          <Image source={{uri: profileImage}} style={styles.image} />
          <View style={styles.user}>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>
              {otherUser.nickname}
            </Text>
            <Text style={{fontSize: 14, color: '#777777'}} numberOfLines={2}>
              {chatRoom.lastMessage ? chatRoom.lastMessage.content : null}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={{fontSize: 12, fontWeight: '300', color: '#aaaaaa'}}>
              {chatRoom.lastMessage
                ? moment(chatRoom.lastMessage.updatedAt).format('MM/DD HH:mm')
                : null}
            </Text>
            {
              chatRoom.lastMessage && chatRoom.lastMessage.user.id === myId ?
              null // 마지막 메세지가 내가 보낸 메세지라면 읽은 상태라는 것이므로 남은 개수 표시 X
              :
              chatRoom.messagesCount === 0 ?
              null // 마지막 메세지가 내가 보낸 메세지가 아니지만 메세지 카운트가 0이라면 표시 X
              :
              // 마지막 메세지가 내가 보낸 메세지가 아니지만 메세지 카운트가 존재하면 표시 O
              <View style={styles.countBox}>
                <Text
                  style={{fontSize: 10, fontWeight: 'bold', color: '#ffffff'}}>
                  {chatRoom.messagesCount}
                </Text>
              </View>
            }
          </View>
        </Pressable>
        <View style={styles.underline} />
      </View>
    );
}

const styles = StyleSheet.create({
    press: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 56,
        height: 56,
        marginLeft: 20,
        marginRight: 12,
        borderRadius: 100
    },
    underline: {
        width: '88%',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1
    },
    user: {
        height: 56,
        width: '45%',
        justifyContent: 'space-around',
    },
    info: {
        flex: 1,
        marginRight: 20,
        alignItems: 'flex-end',
        height: 45,
    },
    countBox: {
        width: 20,
        height: 20,
        backgroundColor: '#ff4444',
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 4
    }
})

export default ChatListItem;