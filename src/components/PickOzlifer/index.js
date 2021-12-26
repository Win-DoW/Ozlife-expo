import React from 'react'
import { View, Text, Pressable, ImageBackground, Image, StyleSheet } from 'react-native'

const PickOzlifer = (props) => {

    const info = props.info.item
    const state = props.state

    const chooseList = () => {

    }

    const deleteList = () => {
        props.modalFunction(true);
    }

    return (
      <Pressable style={styles.press} onPress={state ? chooseList : deleteList}>
        <ImageBackground
          style={styles.backimage}
          source={{uri: info.profile_image}}
          imageStyle={{borderRadius: 100}}>
          {state ? null : (
            <Image
              source={require('../../assets/images/icon-trash.png')}
              style={{width: 88, height: 88}}
            />
          )}
        </ImageBackground>
        <View style={{height: '100%', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 12, color: '#aaaaaa'}}>{info.position}</Text>
          <Text style={{fontSize: 20, fontWeight: '500'}}>{info.user_name}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.image}
              source={require('../../assets/images/icon-heart.png')}
            />
            <Text style={{fontSize: 12, fontWeight: '500', color: '#ff4444'}}>{info.like_count}</Text>
          </View>
          <Text style={{fontSize: 12, fontWeight: '300', color: '#aaaaaa'}}>{info.my_tag}</Text>
        </View>
      </Pressable>
    );
}

const styles = StyleSheet.create({
    press: {
        width: '100%',
        height: 88,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        marginBottom: 20,
        alignItems: 'center'
    },
    backimage: {
        width: 88,
        height: '100%',
        marginLeft: 20,
        marginRight: 16,
    },
    image: {
        width: 24,
        height: 24,
        marginRight: 4
    },
})

export default PickOzlifer;