import React, { useEffect, useState, useRef } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, FlatList, Text, Pressable, ScrollView, TextInput, ImageBackground, Image, SafeAreaView, TouchableOpacity, Modal } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import AppHeader from 'utils/Header';
import styles from './styles';
import SearchBar from 'react-native-platform-searchbar';
import { screen } from '../../../utils/Styles';

const First = ({ navigation, route }) => {

  const [isModal, setModal] = useState(false);
  const [search, setSearch] = useState('');
  const [words, setWords] = useState([]);

  const [images, setImages] = useState([]);
  const [imageIdx, setImageIdx] = useState(0);

  const [inputs, setInputs] = useState({
    title: '',
    profile: '',
    section: '',
  });

  const [tag, setTag] = useState('검색 유입이 쉽도록 검색 유입어를 입력해주세요.')

  const next = async () => {
    try {
      navigation.navigate('Second', {
        ...inputs,
        ...route.params,
        images,
        tag
      });
    } catch (error) {
      console.log('error :', error);
    }
  }

  const searchWords = async () => {
    setWords(words => [...words, search]);
    setSearch('')
  }

  const WordItem = ({ word }) => {

    return (
      <View style={{
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        borderColor: '#ddd', 
        borderBottomWidth: 1, 
        paddingVertical: 10
      }}>
        <Text style={{color: '#666', fontSize: 16}}>{word}</Text>
        <Pressable onPress={() => setWords(words.filter((e)=>(e !== word)))}>
          <Ionicons name="close-circle-outline" size={24} color="black" />
        </Pressable>
      </View>

    )
  }

  const imagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImages([...images, {id: imageIdx, uri: result.uri}]);
      setImageIdx(imageIdx + 1);
    }
  };

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

          <Modal
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            animationType="slide"
            transparent={true}
            visible={isModal}
            onRequestClose={() => {
              setModal(!isModal);
            }}
          >
            <>
              <SafeAreaView style={{ flex: 0, backgroundColor: "#ffffff" }} />
              <SafeAreaView style={styles.container}>

                <View style={styles.headerContainer}>
                  <TouchableOpacity
                    style={styles.leftIcon}
                    onPress={() => {
                      setTag(words.join(','))
                      setSearch('');
                      setModal(false)
                    }}
                  >
                    <Ionicons name="chevron-back-outline" size={32} color="black" />
                  </TouchableOpacity>

                  <View style={{ ...styles.titleContainer }}>
                    <SearchBar
                      placeholder="검색 유입어 추가"
                      cancelText="취소"
                      onChangeText={(text) => setSearch(text)}
                      value={search}
                      onSubmitEditing={() => searchWords()}
                      theme="light"
                      platform="ios"
                      style={{ width: screen.width - 60 }}
                    />
                  </View>
                </View>

                <View style={{flex: 1, paddingHorizontal: 20, marginVertical: 16}}>
                  <View style={{borderColor: '#ddd', borderBottomWidth: 1, paddingVertical: 16}}>
                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>검색 유입어</Text>
                  </View>
                  
                  <FlatList
                    data={words}
                    renderItem={({item}) => <WordItem word={item} />}
                    keyExtractor={(item, id) => id}
                  />
                </View>

              </SafeAreaView>
            </>
          </Modal>

          <AppHeader
            title={"방문 온라인 피드백"}
            noIcon={false}
            leftIcon={<Ionicons name="chevron-back-outline" size={32} color="black" />}
            leftIconPress={() => navigation.goBack()}
          />

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
              <Text style={{...styles.text, marginBottom: 12}}>질문 영역을 설정해주세요.</Text>
              <RNPickerSelect
                textInputProps={{ underlineColorAndroid: 'transparent'}}
                placeholder={{ label: "질문 영역을 설정해주세요.", value: '' }}
                fixAndroidTouchableBug={true}
                value={inputs.section}
                onValueChange={(value) => setInputs({...inputs, 'section': value})}
                useNativeAndroidPickerStyle={false}
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

            <Pressable style={styles.formbox} onPress={() => setModal(true)}>
              <Text style={styles.text}>검색 유입어를 입력해주세요.</Text>
              <Text style={{...styles.textinput, marginTop: 10}}>{tag}</Text>
            </Pressable>            

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

