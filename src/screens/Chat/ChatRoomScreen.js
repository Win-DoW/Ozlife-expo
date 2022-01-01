import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, KeyboardAvoidingView, Platform, FlatList, Image, TouchableOpacity } from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import { Ionicons } from '@expo/vector-icons';

import { API, graphqlOperation, Auth, Storage } from "aws-amplify";
import { messagesByChatRoom, getChatRoom } from 'graphql/queries'; // 채팅방과 연관된 메세지를 불러옴
import { getUserOnProfileInformationEditScreen } from 'graphql/custom'

import Header from "utils/Header";
import ChatMessage from "components/ChatComponents/ChatMessage";

const ChatRoomScreen = ({ navigation, route }) => {

  const id = route.params.id;
  const name = route.params.name;
  
  const [user, setUser] = useState({})
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      fetchData();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchData = async () => {
    try {
      setLoading(true)
      const userKey = await Auth.currentAuthenticatedUser({bypassCache: false})
      const user = await API.graphql(graphqlOperation(getUserOnProfileInformationEditScreen, {
        id: userKey.attributes.sub
      }))
      const image = await Storage.get(user.image)
      setUser({...user, image})

      const messagesInChatRoom = await API.graphql(graphqlOperation(messagesByChatRoom, {
        chatRoomID: id,
        sortDirection: "DESC"
      }))
      console.log("이전 메세지 불러오기 성공")
      setMessages(messagesInChatRoom.data.messagesByChatRoom.items)
      setLoading(false)
    } catch (e) {
      console.log("실패")
      setLoading(false)
      console.log(e);
    }
  };

  const goToBack = () => {
    navigation.pop();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={90}
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
          title={name}
          noIcon={false}
          leftIcon={<Ionicons name="chevron-back-outline" size={32} color="#000000" />}
          leftIconPress={goToBack}
        />

        <FlatList
          data={messages}
          renderItem={({item}) => <ChatMessage message={item} myId={user.id}/>}
          inverted
          keyExtractor={(item) => item.id}
        />

        <View style={styles.bottomBox}>
          <Image
            source={{ uri: user.image }}
            style={styles.bottomImage}
          />
          <TouchableOpacity>
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
    backgroundColor: "#15b6f1",
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  bottomBox: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingLeft: 12,
    paddingRight: 8,
    alignItems: 'center',
    flexDirection: 'row'
  },
  bottomImage: {
    height: 24,
    width: 24,
    borderRadius: 6
  },
  bottomBtn: {
    width: 32,
    height: 32,
    borderRadius: 4
  }
});

export default ChatRoomScreen;
