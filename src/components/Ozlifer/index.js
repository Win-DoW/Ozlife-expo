import React from 'react'
import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const Ozlifer = ({ user }) => {

  const navigation = useNavigation();

  return (
    <Pressable style={styles.container}>
      <Image style={styles.image} source={{ uri:user.image }} />
      <View style={{height: '100%', justifyContent: 'space-between'}}>
        <Text style={{fontSize: 12, color: '#aaaaaa'}}>전문 오지라퍼</Text>
        <Text style={{fontSize: 20, fontWeight: '500'}}>{user.nickname}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{ width: 24, height: 24, marginRight: 4} }
            source={require('../../assets/images/icon-heart.png')}
          />
          <Text style={{fontSize: 12, fontWeight: '500', color: '#ff4444'}}>1000</Text>
        </View>
        <Text style={{fontSize: 12, fontWeight: '300', color: '#aaaaaa'}}>#{user.interest}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 88,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center'
  },
  image: {
    width: 88,
    height: '100%',
    marginLeft: 20,
    marginRight: 16,
    borderRadius: 100
  }
})

export default Ozlifer;