import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import Ionicons from 'react-native-vector-icons/Ionicons';

import ProfileSettingList from '../../components/ProfileSettingList';

const ProfileSettingScreen = ({ navigation, route }) => {

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

    const goToBack = () => {
        navigation.pop();
    }

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#FFFFFF' }}/>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Pressable style={styles.backIcon} onPress={goToBack}>
                        <Ionicons name="chevron-back-outline" size={32} color="#000000" />
                    </Pressable>
                    <Text style={styles.headerText}>환경설정</Text>
                </View>

                <ProfileSettingList text={'최우창님 정보 수정'} press={goToProfileEdit} style={{ marginTop: 16 }}/>

                <ProfileSettingList text={'가게 관리'} press={() => console.warn('2')} style={{ marginTop: 17 }}/>

                <ProfileSettingList text={'알림'} press={() => console.warn('3')} style={{ marginTop: 17 }}/>

                <ProfileSettingList text={'게시글 미노출 사용자 관리'} press={() => console.warn('3')} style={{ borderWidth: 0, borderBottomWidth: 1 }} />

                <ProfileSettingList text={'고객센터'} press={() => console.warn('4')} style={{ marginTop: 18 }}/>

                <ProfileSettingList text={'로그아웃'} press={signOut} style={{ borderWidth: 0, borderBottomWidth: 1 }} textStyle={{ fontSize: 17, fontWeight: 'bold', color: '#f44' }}/>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFEF'
    },
    header: {
        width: '100%',
        height: 56,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backIcon: {
        position: 'absolute',
        left: 8
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    }
})

export default ProfileSettingScreen;