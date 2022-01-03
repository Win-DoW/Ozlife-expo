import React, { useEffect, useState, useRef } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, Text, Pressable, ScrollView, TextInput, ImageBackground, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from 'utils/Header';
import styles from './styles';
import { API, graphqlOperation, Storage, Auth } from 'aws-amplify';
import { createOzlife } from 'graphql/mutations';

const Fifth = ({ navigation, route }) => {

  const [loading, setLoading] = useState(false);

  const ex = route.params;

  const [name, setName] = useState('');
  const [promotion, setPromotion] = useState('free');
  const [original_price, setOG] = useState(0);
  const [discount_price, setDC] = useState(0);

  const newOzlife = async () => {
    try {
      setLoading(true);

      const keys = await Promise.all(ex.images.map(async (image, idx) => {
        const photo = await fetch(image.uri);
        const photoBlob = await photo.blob();

        const result = await Storage.put(`${ex.userID}/ozlife/${ex.title}/${idx}.jpg`, photoBlob, {
          contentType: 'image/jpeg',
        });

        return result.key;
      }))

      const ozlife = await API.graphql(graphqlOperation(createOzlife, { input: {
        ...ex,
        images: keys,
        name,
        promotion,
        original_price,
        discount_price,
      }}));
      
      setLoading(false);

      navigation.navigate('MainTab', { screen: 'OzlifeScreen' });

    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  const free = () => {
    setPromotion('free');
    setDC(0);
  }

  const discount = () => {
    setPromotion('discount');   
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>

          <Spinner
            //visibility of Overlay Loading Spinner
            visible={loading}
            //Text with the Spinner
            textContent={'Loading...'}
            //Text style of the Spinner Text
            textStyle={styles.spinnerTextStyle}
          />

          <AppHeader
            title={"방문 온라인 피드백"}
            noIcon={false}
            leftIcon={<Ionicons name="chevron-back-outline" size={32} color="black" />}
            leftIconPress={() => navigation.goBack()}
          />

          <View style={styles.formbox}>
            <Text style={styles.text}>상품이름</Text>
            <TextInput 
              style={styles.textinput}
              onChangeText={(value) => setName(value)}
            />
          </View>

          <View style={styles.formbox}>
            <Text style={styles.text}>기존가격</Text>
            <TextInput 
              keyboardType = 'numeric'
              style={styles.textinput}
              onChangeText={(value) => setOG(value)}
            />
          </View>

          <View style={styles.formbox}>
            <Text style={styles.text}>프로모션</Text>
          </View>

          <View style={styles.formbox, { flexDirection: 'row', justifyContent: 'space-between', padding: 20, paddingBottom: 0 }}>
            <TouchableOpacity onPress={free} style={promotion === 'free' ? styles.promotionPressBtn : styles.promotionBtn}>
                <Text style={promotion === 'free' ? styles.promotionPressText : styles.promotionText}>무료제공</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={discount} style={promotion === 'discount' ? styles.promotionPressBtn : styles.promotionBtn}>
                <Text style={promotion === 'discount' ? styles.promotionPressText : styles.promotionText}>가격할인</Text>
            </TouchableOpacity>
          </View>

          { promotion === 'discount' &&

          <View style={styles.formbox}>
            <Text style={styles.text}>할인가격</Text>
            <TextInput 
              keyboardType = 'numeric'
              style={styles.textinput}
              onChangeText={(value) => setDC(value)}
            />
          </View>

          }

          <View style={styles.bottom}>
            <TouchableOpacity onPress={newOzlife} style={styles.button}>
              <Text style={styles.buttontext}>완료</Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Fifth;
