import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import moment from 'moment';

const ChatMessage = (props) => {

    const { message, myId, myImage } = props

    const isMyMessage = () => {
        return message.user.id === myId;
    }

    return isMyMessage() ? (
      <View style={{width: '100%', marginBottom: 16}}>
        <View style={[styles.container, {justifyContent: 'flex-end'}]}>
          <View style={[styles.messagebox, {marginLeft: 64, backgroundColor: '#15b6f1',}]}>
            <Text style={[styles.text, {color: '#ffffff'}]}>{message.content}</Text>
          </View>
          <View style={[styles.triangle, {marginRight: 8, transform: [{rotate: '90deg'}], borderRightWidth: 8, borderBottomColor: '#15b6f1'}]} />
        </View>
        <View style={{flex: 1, alignItems: 'flex-end', marginRight: 18}}>
          <Text style={styles.time}>{moment(message.createdAt).format("MM/DD HH:mm")}</Text>
        </View>
      </View>
    ) : (
      <View style={{width: '100%', marginBottom: 16}}>
        <View style={[styles.container, {justifyContent: 'flex-start'}]}>
          <Image source={{uri: myImage}} style={styles.image} />
          <View style={[styles.triangle, {marginLeft:3, transform: [{rotate: '270deg'}], borderLeftWidth: 8, borderBottomColor: '#ffffff'}]} />
          <View style={[styles.messagebox, {marginRight: 64, backgroundColor: '#ffffff',}]}>
            <Text style={styles.text}>{message.content}</Text>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'flex-start', marginLeft: 55}}>
          <Text style={styles.time}>{moment(message.createdAt).format("MM/DD HH:mm")}</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  image: {
    width: 32,
    height: 32,
    borderRadius: 100,
    marginLeft: 8,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    marginTop: 8,
  },
  messagebox: {
    borderRadius: 8,
  },
  text: {
    margin: 8,
    fontSize: 14,
  },
  container: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 4,
  },
  time: {
    fontSize: 10,
    fontWeight: '300',
    color: '#777777'
  }
});

export default ChatMessage