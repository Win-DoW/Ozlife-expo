import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import KakaoLogo from 'react-native-kakao-logo';
import Icon from 'react-native-vector-icons/dist/Ionicons'

const KAKAO = 0
const NAVER = 1
const APPLE = 2

export default class IconCustomButton extends Component{
    // props를 App.js의 IconCustomButton으로부터 넘겨받지 못할경우 기본값으로 초기화
  static defaultProps = {
    title: 'untitled',
    buttonColor: '#000',
    titleColor: '#fff',
    onPress: () => null,
    logo: 0
  }

  constructor(props){
    super(props);
  }

  render(){
    return (
        // TouchableOpacity를 통해 button을 커스텀할 수 있음
      <TouchableOpacity 
      //   투명도 조절
      activeOpacity={.7} 
      style={[styles.button, {backgroundColor: this.props.buttonColor}]} 
      onPress={this.props.onPress}>
        <Text style={[styles.title, {color: this.props.titleColor}]}>{this.props.title}</Text>
        {/* 아이콘 사용법
        https://chaewonkong.github.io/posts/react-native-vector-icons-ko.html
        https://github.com/oblador/react-native-vector-icons
        https://npm.io/package/react-native-kakao-logo */}
        {this.props.logo === KAKAO && <KakaoLogo style={styles.logo, {position: 'absolute', alignSelf: 'flex-start', marginLeft: 35}} size={30} color={'#3C1E1E'} />}
        {this.props.logo === APPLE && <Icon name='logo-apple' size={30} color="#FFFFFF" style={{position: 'absolute', alignSelf: 'flex-start', marginLeft: 35}}/>}
        {this.props.logo === NAVER && <Text style={{fontSize: 30, fontWeight: 'bold', color: '#FFFFFF', position: 'absolute', alignSelf: 'flex-start', marginLeft: 39}}>N</Text>}
        {/* position: 'absolute' 하면 컴포넌트 위에 컴포넌트를 배치할 수 있음
        원래는 부모 컴포넌트의 prop에 의해 중앙에 배치되어야하지만 
        alignSelf: 'flex-start' 를 통해 아이콘을 버튼 좌측부분에 배치시킴 */}
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold'
  },
});