import React, { useEffect, useState, useRef } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, FlatList, Text, Pressable, ScrollView, TextInput, ImageBackground, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';

import styles from './styles';

const First = ({ navigation, route }) => {

  const [images, setImages] = useState([]);
  const [inputs, setInputs] = useState({
    title: '',
    profile: '',
    section: '',
    tag: ''
  });

  const next = async () => {
    try {
      navigation.navigate('Second', {
        ...inputs,
        ...route.params,
        images: images
      });
    } catch (error) {
      console.log('error :', error);
    }
  }
  
  const imagePicker = () => {
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      const data = images.map((image, idx) => {
        let imageUri = Platform.OS === 'ios' ? `file:///${image.path}` : image.path;
        let file = {
          id: idx,
          uri: imageUri,
        }
        return file;
      })
      console.log(data);
      setImages(data);      
    });      
  }

  const onRemove = id => e => {
    setImages(images.filter(image => image.id !== id));
  };

  const SettingImage = ({data}) => {

    return (
      <ImageBackground
        style={styles.image}
        imageStyle={{borderRadius: 4}}
        source={{uri: data.uri}}>
        <View style={{flex: 1}}/>
        <View style={{flex: 1}}/>
        <Pressable style={{flex: 1, width: 80, alignItems: 'flex-end'}} onPress={onRemove(data.id)}>
          <Image
            style={{height: 30, width: 30}}
            source={require('../../../assets/images/icon-minus.png')}
          />
        </Pressable>
      </ImageBackground>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <ScrollView>

            <View style={styles.formbox}>
              <Text style={styles.text}>제목</Text>
              <TextInput 
                style={styles.textinput} 
                placeholder='제목을 입력해주세요.'
                onChangeText={(value) => setInputs({...inputs, 'title': value})}
              />
            </View>

            <View style={styles.formbox}>
              <Text style={styles.text}>질문에 대한 간단한 설명</Text>
              <TextInput 
                style={styles.textinput} 
                placeholder='설명을 입력해주세요.'
                onChangeText={(value) => setInputs({...inputs, 'profile': value})}
              />
            </View>

            <View style={styles.formbox}>
              <Text style={styles.text}>질문의 대표 사진입니다.</Text>
              <View style={{height: 66, marginTop: 8, marginBottom: 12, flexDirection: 'row'}}>
                <View style={styles.imageview}>
                  <View style={{flex: 1}}></View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    <Text style={{fontSize: 12, color: '#aaaaaa'}}>사진추가</Text>
                  </View>
                  <Pressable style={{flex: 1, width: 80, alignItems: 'flex-end',}} onPress={imagePicker}>
                    <Image style={{height: 30, width: 30}} source={require('../../../assets/images/icon-plus.png')}/>
                  </Pressable>
                </View>            
              </View>
              <View style={{height: 100}}>
                <FlatList
                  data={images}
                  renderItem={({item}) => <SettingImage data={item} />}
                  keyExtractor={( item ) => item.id}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                />
              </View>
            </View>

            <View style={styles.formbox}>
              <Text style={styles.text}>구체적인 영역을 설정해주세요.</Text>
              <RNPickerSelect
                placeholder={ inputs.interest === '' ? { label: "영역을 선택해주세요.", value: '' } : { label: inputs.section, value: inputs.section } }
                name="interest"
                onValueChange={(value) => setInputs({...inputs, 'section': value})}
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
              <Text style={styles.text}>해시태그를 입력해주세요.</Text>
              <TextInput 
                style={styles.textinput} 
                placeholder='태그를 입력해주세요.'
                onChangeText={(value) => setInputs({...inputs, 'tag': value})}
              />
            </View>            

          </ScrollView>

          <View style={styles.bottom}>
            <TouchableOpacity onPress={next} style={styles.button}>
              <Text style={styles.buttontext}>다음</Text>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default First;

