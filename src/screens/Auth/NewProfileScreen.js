import React, { useState, useEffect, useRef } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, Text, ScrollView, TextInput, Pressable, SafeAreaView, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Spinner from 'react-native-loading-spinner-overlay';

import Sample from '../../data/Sample';
import { API, graphqlOperation, Storage, Auth } from 'aws-amplify';
import { createUser } from '../../graphql/mutations';

import * as ImagePicker from 'expo-image-picker';

const NewProfileScreen = ({ navigation, route }) => {

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [nickname, setNickname] = useState(null);
  const [interest, setInterest] = useState(null);
  const [region, setRegion] = useState(null);
  const [file, setFile] = useState(Sample[0].imageUri);
 
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const userKey = await Auth.currentAuthenticatedUser({bypassCache: false});
      setUser(userKey.attributes);

      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  const newUser = async () => {
    try {
      setLoading(true);

      const photo = await fetch(file)
      const photoBlob = await photo.blob();

      const result = await Storage.put(`${user.sub}/MyProfile.jpg`, photoBlob, {
        contentType: 'image/jpeg',
      });

      await API.graphql(graphqlOperation(createUser, { input: {
        id: user.sub,
        nickname: nickname,
        email: user.email,
        profile: '작성된 프로필이 없습니다.',
        interest: interest,
        region: region,
        image: result.key,
      }}));

      setLoading(false);
      navigation.reset({routes: [{name: 'FinishScreen'}]});
     
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setFile(result.uri);
    }
  };
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <ScrollView>

            <Spinner
              //visibility of Overlay Loading Spinner
              visible={loading}
              //Text with the Spinner
              textContent={'Loading...'}
              //Text style of the Spinner Text
              textStyle={styles.spinnerTextStyle}
            />

            <View style={styles.formbox}>
              <Text style={styles.text}>닉네임</Text>
              <TextInput 
                style={styles.textinput} 
                placeholder='닉네임을 입력해주세요.'
                onChangeText={(text) => setNickname(text)}
              />
            </View>

            <View style={styles.formbox}>
              <Text style={styles.text}>프로필 이미지</Text>
              <ImageBackground style={styles.image} imageStyle={{ borderRadius: 100}} source={{ uri: file }}>
                <Pressable onPress={imagePicker}>
                  <Image style={{height: 24, width: 24}} source={require('../../assets/images/icon-plus.png')}/>
                </Pressable>
              </ImageBackground>
            </View>

            <View style={styles.formbox}>
              <Text style={styles.text}>관심 업종 선택</Text>
              <RNPickerSelect
                placeholder={{ label: "영역을 선택해주세요.", value: null }}
                onValueChange={(value) => setInterest(value)}
                items={[
                    { label: '맛보기', value: '맛보기' },
                    { label: '홍보/마케팅', value: '홍보/마케팅' },
                    { label: '메뉴개발', value: '메뉴개발' },
                    { label: '인테리어', value: '인테리어' },
                    { label: '디자인', value: '디자인' },
                    { label: '정부지원사업 신청', value: '정부지원사업 신청' },
                    { label: '법률', value: '법률' },
                    { label: '회계', value: '회계' },
                ]}
              />
            </View>

            <View style={styles.formbox}>
              <Text style={styles.text}>거주 지역</Text>
              <RNPickerSelect
                placeholder={{ label: "지역을 선택해주세요.", value: null }}
                onValueChange={(value) => setRegion(value)}
                items={[
                    { label: '부산 부산진구', value: '부산 부산진구' },
                    { label: '부산 해운대구', value: '부산 해운대구' },
                    { label: '부산 사하구', value: '부산 사하구' },
                    { label: '부산 북구', value: '부산 북구' },
                    { label: '부산 남구', value: '부산 남구' },
                    { label: '부산 동래구', value: '부산 동래구' },
                    { label: '부산 금정구', value: '부산 금정구' },
                    { label: '부산 사상구', value: '부산 사상구' },
                    { label: '부산 연제구', value: '부산 연제구' },
                    { label: '부산 수영구', value: '부산 수영구' },
                    { label: '부산 기장군', value: '부산 기장군' },
                    { label: '부산 강서구', value: '부산 강서구' },
                    { label: '부산 영도구', value: '부산 영도구' },
                    { label: '부산 서구', value: '부산 서구' },
                    { label: '부산 동구', value: '부산 동구' },
                    { label: '부산 중구', value: '부산 중구' },
                ]}
              />
            </View>

          </ScrollView>

          <View style={styles.bottom}>
            <TouchableOpacity onPress={newUser} style={styles.button}>
              <Text style={styles.buttontext}>다음</Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
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
  textinput: {
    fontSize: 14,
    color: '#666666',
    height: 40,
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
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
  image: {
      height: 66,
      width: 66,
      borderRadius: 33,
      marginTop: 8,
      alignItems: 'flex-end',
      justifyContent: 'flex-end'
  },
  selfinfo: {
      fontSize: 14,
      borderBottomColor: '#dddddd',
      borderBottomWidth: 1
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
})

export default NewProfileScreen;