import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, View, Text, StyleSheet, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

const OzlifeMapScreen = ({ navigation, route }) => {

  const ozlife = route.params.ozlife;
  const store = route.params.ozlife.store;

  const [loading, setLoading] = useState(false);
  const [distance, setDistance] = useState('');

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }


  // function getDistanceFromLatLonInKm(lat1, lng1, lat2, lng2) {
  //   function deg2rad(deg) { 
  //     return deg * (Math.PI/180);
  //   }

  //   var R = 6371; // Radius of the earth in km
  //   var dLat = deg2rad(lat2-lat1); // deg2rad below 
  //   var dLon = deg2rad(lng2-lng1); 
  //   var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2); 
  //   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  //   var d = R * c; // Distance in km

  //   if (d < 1) {
  //     return Math.round(d * 1000) + 'm';
  //   } else {
  //     return Math.round(d * 10)/10 + 'km';
  //   }
  // }


  // const requestLocationPermission = async () => {
  //   if (Platform.OS === 'ios') {
  //     getLocation();
  //   } else {
  //     try {
  //       const granted = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //         {
  //           title: 'Location Access Required',
  //           message: 'This App needs to Access your location',
  //         },
  //       );
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         getLocation();
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   }
  // };

  // const getLocation = () => {
  //   Geolocation.getCurrentPosition(
  //     (position) => {
  //       setDistance(getDistanceFromLatLonInKm(position.coords.latitude, position.coords.longitude, store.latitude, store.longitude));
  //     },
  //     (error) => {
  //       console.warn(error);
  //     },
  //     {
  //       enableHighAccuracy: false,
  //       timeout: 30000,
  //       maximumAge: 1000
  //     },
  //   );
  // };

  const next = () => {
    navigation.navigate("OzlifeTime", {
        ozlife,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE} 
        initialRegion={{ latitude: store.latitude, longitude: store.longitude, latitudeDelta: 0.001, longitudeDelta: 0.001 }} 
      >
        <Marker
          pinColor="#15b6f1"
          ref={ref => {
            this.marker = ref;
          }}
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
        <TouchableOpacity style={styles.buttonB}>
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