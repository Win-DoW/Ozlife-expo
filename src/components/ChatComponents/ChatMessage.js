import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import moment from 'moment';

const ChatMessage = ({ message, myId, otherUserImage }) => {

    const isMyMessage = () => {
        return message.user.id === myId;
    }

    return isMyMessage() ? (
      <View style={{ alignItems: 'flex-end', marginVertical: 4 }}>
        <View style={{...styles.messageLine, justifyContent: 'flex-end'}}>
            <View style={styles.myMessageBox}>
              <Text style={{ fontSize: 14, color: '#ffffff' }}>
                {message.content}
              </Text>
            </View>
            <View style={[styles.triangle, styles.myTriangle]}></View>
        </View>
        <View style={{ marginRight: 15 }}>
          <Text style={styles.timeText}>{moment(message.createdAt).format("MM/DD HH:mm")}</Text>
        </View>
      </View>
    ) : (
      <View style={{ alignItems: 'flex-start', marginVertical: 4 }}>
        <View style={{...styles.messageLine, justifyContent: 'flex-start'}}>
          <Image
            source={{ uri: otherUserImage }}
            style={styles.image}
          />
          <View style={[styles.triangle, styles.otherTriangle]}></View>
          <View style={styles.otherMessageBox}>
            <Text style={{ fontSize: 14 }}>
              {message.content}
            </Text>
          </View>
        </View>
        <View style={{ marginLeft: 52 }}>
          <Text style={styles.timeText}>{moment(message.createdAt).format("MM/DD HH:mm")}</Text>
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  messageLine: {
    flexDirection: 'row',
    marginBottom: 4
  },
  myMessageBox: {
    marginLeft: 64,
    borderRadius: 8,
    backgroundColor: '#15b6f1',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  otherMessageBox: {
    marginRight: 64,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
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
  myTriangle: {
    marginRight: 8,
    transform: [{rotate: '90deg'}],
    borderRightWidth: 8,
    borderBottomColor: '#15b6f1'
  },
  otherTriangle: {
    marginLeft:3,
    transform: [{rotate: '270deg'}],
    borderLeftWidth: 8,
    borderBottomColor: '#ffffff'
  },
  timeText: {
    fontSize: 10,
    fontWeight: '300',
    color: '#777777'
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginLeft: 8,
  }
});

export default ChatMessage