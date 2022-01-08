import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Auth } from 'aws-amplify';

import ProfileSettingList from 'components/ProfileComponents/ProfileSettingList';
import Header from 'utils/Header';

const ProfileSettingScreen = ({ navigation, route }) => {

    const userName = route.params.name;

    const signOut = async() => {
        try {
            await Auth.signOut();
            navigation.reset({routes: [{name: 'AuthNavi'}]});
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    const goToProfileEdit = () => {
        navigation.navigate('ProfileInformationEditScreen');
    }

    const goToStoreAdd = () => {
        navigation.navigate('StoreSearchScreen')
    }

    const goToNotiManage = () => {
        navigation.navigate('NotiManageScreen')
    }

    const goToBack = () => {
        navigation.pop();
    }

    return (
        <SafeAreaView style={styles.container}>

            <Header
                title={'환경설정'}
                noIcon={false}
                leftIcon={<Ionicons name="chevron-back-outline" size={32} color="#000000" />}
                leftIconPress={goToBack}
            />

            <ProfileSettingList text={userName + '님 정보 수정'} press={goToProfileEdit} style={{ marginTop: 16 }}/>

            <ProfileSettingList text={'가게 추가'} press={goToStoreAdd} style={{ marginTop: 17 }}/>

            <ProfileSettingList text={'알림'} press={goToNotiManage} style={{ marginTop: 17 }}/>

            <ProfileSettingList text={'게시글 미노출 사용자 관리'} style={{ borderWidth: 0, borderBottomWidth: 1, backgroundColor: '#efefef' }} />

            <ProfileSettingList text={'고객센터'} style={{ marginTop: 18, backgroundColor: '#efefef' }}/>

            <ProfileSettingList text={'로그아웃'} press={signOut} style={{ borderWidth: 0, borderBottomWidth: 1 }} textStyle={{ fontSize: 17, fontWeight: 'bold', color: '#f44' }}/>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    }
})

export default ProfileSettingScreen;