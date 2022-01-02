import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from 'utils/Header';

const OzlifeWriteScreen = ({ navigation, route }) => {

  const store = route.params.store;

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title={"오지랖 선택"}
        noIcon={false}
        leftIcon={<Ionicons name="chevron-back-outline" size={32} color="black" />}
        leftIconPress={() => navigation.goBack()}
      />
      <View style={styles.formbox}>
          <Text style={styles.text}>필요한 오지랖을 선택해주세요.</Text>
      </View>

      <View style={styles.formbox}>
        <TouchableOpacity style={styles.ozlifeButtonPress}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>방문 온라인 피드백</Text>
            <Text style={{color: 'white', fontSize: 14}}>방문 후 피드백은 온라인으로 진행됩니다.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('First', { userID: store.userID, storeID: store.id, address: store.address })}>
          <Text style={styles.buttontext}>다음</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'flex-start', 
    backgroundColor: '#FFFFFF'
  },  
  formbox: {
    marginTop: 30,
    marginHorizontal: 24,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  ozlifeButtonPress: {
    width: '100%',
    height: 80, 
    marginVertical: 16, 
    alignItems: 'center', 
    backgroundColor: '#15b6f1', 
    borderRadius: 10, 
    justifyContent: 'center'
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginTop: 100,
  },
  button: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    backgroundColor: '#15b6f1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttontext: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff'
  },
});

export default OzlifeWriteScreen;