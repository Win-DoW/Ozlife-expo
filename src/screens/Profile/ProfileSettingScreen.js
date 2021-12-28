import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';

import { Auth, API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../graphql/queries';

import ProfileSettingList from '../../components/ProfileSettingList';

const ProfileSettingScreen = ({ navigation, route }) => {

    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchUserData();
        })

        return unsubscribe;
    }, [navigation])

    const fetchUserData = async() => {
        try {
            setLoading(true);
            const userKey = await Auth.currentAuthenticatedUser({bypassCache: false})
            const user = await API.graphql(graphqlOperation(getUser, {
                id: userKey.attributes.sub
            }))
            setUserData(user.data.getUser)
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e)
        }
    }

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

    const goToStoreManage = () => {
        navigation.navigate('SettingStoreManageScreen')
    }

    const goToSettingNoti = () => {
        navigation.navigate('SettingNotiScreen')
    }

    const goToBack = () => {
        navigation.pop();
    }

    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: '#FFFFFF' }}/>
            <SafeAreaView style={styles.container}>

                <Spinner
                    //visibility of Overlay Loading Spinner
                    visible={loading}
                    //Text with the Spinner
                    textContent={'Loading...'}
                    //Text style of the Spinner Text
                    textStyle={styles.spinnerTextStyle}
                />

                <View style={styles.header}>
                    <Pressable style={styles.backIcon} onPress={goToBack}>
                        <Ionicons name="chevron-back-outline" size={32} color="#000000" />
                    </Pressable>
                    <Text style={styles.headerText}>환경설정</Text>
                </View>

                <ProfileSettingList text={userData.nickname + '님 정보 수정'} press={goToProfileEdit} style={{ marginTop: 16 }}/>

                <ProfileSettingList text={'가게 관리'} press={goToStoreManage} style={{ marginTop: 17 }}/>

                <ProfileSettingList text={'알림'} press={goToSettingNoti} style={{ marginTop: 17 }}/>

                <ProfileSettingList text={'게시글 미노출 사용자 관리'} style={{ borderWidth: 0, borderBottomWidth: 1, backgroundColor: '#efefef' }} />

                <ProfileSettingList text={'고객센터'} style={{ marginTop: 18, backgroundColor: '#efefef' }}/>

                <ProfileSettingList text={'로그아웃'} press={signOut} style={{ borderWidth: 0, borderBottomWidth: 1 }} textStyle={{ fontSize: 17, fontWeight: 'bold', color: '#f44' }}/>

            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
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