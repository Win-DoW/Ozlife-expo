import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';

import { Auth } from 'aws-amplify';

const SplashScreen = ({navigation}) => {
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      try {
        await Auth.currentAuthenticatedUser();
        navigation.replace('MainNavi');
      } catch (e) {
        console.log(e);
        navigation.replace('AuthNavi');
      }
    }    

    setTimeout(() => {
      setAnimating(false);
      fetch();
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={{width: '50%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#15b6f1',
    },
    activityIndicator: {
      alignItems: 'center',
      height: 80,
    },
});

export default SplashScreen;