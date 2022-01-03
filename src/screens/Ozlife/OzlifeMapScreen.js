import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Ionicons } from '@expo/vector-icons';
import AppHeader from 'utils/Header';
import { ReturnChatRoomID } from 'utils/Chat';

const OzlifeMapScreen = ({ navigation, route }) => {

  const ozlife = route.params.ozlife;
  const store = ozlife.store;
  const userID = route.params.userID;

  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setDistance(getDistanceFromLatLonInKm(location.coords.latitude, location.coords.longitude, store.latitude, store.longitude));
    })();
  }, []);

  const goToChatRoom = () => {
    const result = ReturnChatRoomID(userID, ozlife.userID).then(response => {
        navigation.navigate('ChatRoomScreen', {
            chatRoomId: response
        })
    })
  }

  function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
    function deg2rad(deg) { 
      return deg * (Math.PI/180);
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1); // deg2rad below 
    var dLon = deg2rad(lng2-lng1); 
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km

    if (d < 1) {
      return Math.round(d * 1000) + 'm';
    } else {
      return Math.round(d * 10)/10 + 'km';
    }
  }

  const next = () => {
    navigation.navigate("OzlifeTimeScreen", {
        ozlife,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <AppHeader
        title={ozlife.name}
        noIcon={false}
        leftIcon={<Ionicons name="chevron-back-outline" size={32} color="black" />}
        leftIconPress={() => navigation.goBack()}
      />

      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE} 
        initialRegion={{ latitude: store.latitude, longitude: store.longitude, latitudeDelta: 0.001, longitudeDelta: 0.001 }} 
      >
        <Marker
          pinColor="#15b6f1"
          coordinate={{ latitude : store.latitude , longitude : store.longitude }}
          title={store.name}
          description={store.address}
        />
      </MapView>

      <View style={styles.section}>
        <Text style={styles.text}>현재 위치로부터</Text>
        <View style={{flexDirection: 'row', marginTop: 4}}>
          <Text style={{...styles.text, color: '#15b6f1', marginRight: 4}}>{distance}</Text>
          <Text style={styles.text}>떨어져 있어요</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.text}>장소는 확인하셨나요?</Text>
        <TouchableOpacity style={styles.buttonA} onPress={next}>
          <Text style={styles.buttonAText}>네!</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonB} onPress={goToChatRoom}>
          <Text style={styles.buttonBText}>잘 모르겠어요.. (1:1 채팅하기)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").width,
    marginBottom: 8,
  },
  section: {
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  buttonA: {
    marginTop: 16,
    width: '100%',
    height: 60,
    backgroundColor: '#15b6f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonAText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  buttonB: {
    marginVertical: 8,
    width: '100%',
    height: 60,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#15b6f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#15b6f1',
  },
});

export default OzlifeMapScreen;