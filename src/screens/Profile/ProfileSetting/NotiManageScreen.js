import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from 'utils/Header';
import NotiManageList from 'components/ProfileComponents/NotiManageList';

import { updateUser } from 'graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify';

const NotiManageScreen = ({ navigation, route }) => {

    const user = route.params.user

    const [chatSwitch, setChatSwitch] = useState(user.chat_noti_state == 1 ? true : false);
    const [ozlifeSwitch, setOzlifeSwitch] = useState(user.ozlife_noti_state == 1 ? true : false);
    const [extraSwitch, setExtraSwitch] = useState(false);

    const mountedChat = useRef(false);
    const mountedOzlife = useRef(false);

    useEffect(async() => {
      if(!mountedChat.current) {
        mountedChat.current = true;
      } else {
        var state;
        if(chatSwitch) {
            state = 1;
        } else {
            state = 0;
        }
        await API.graphql(graphqlOperation(updateUser, {
            input: {
                id: user.id,
                chat_noti_state: state
            }
        }))
      }
    }, [chatSwitch])

    useEffect(async() => {
        if(!mountedOzlife.current) {
            mountedOzlife.current = true;
        } else {
            var state;
            if(ozlifeSwitch) {
                state = 1;
            } else {
                state = 0;
            }
            await API.graphql(graphqlOperation(updateUser, {
                input: {
                    id: user.id,
                    ozlife_noti_state: state
                }
            }))
        }
    }, [ozlifeSwitch])

    const goToBack = () => {
        navigation.pop()
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>

            <Header
                title={'알림'}
                noIcon={false}
                leftIcon={<Ionicons name="chevron-back-outline" size={32} color="#000000" />}
                leftIconPress={goToBack}
            />

            <View style={styles.notiManageBox}>
                <NotiManageList
                    title={'채팅알림'}
                    switchState={chatSwitch}
                    setSwitchState={setChatSwitch}
                />

                <NotiManageList
                    title={'오지랖 도착 알림'}
                    switchState={ozlifeSwitch}
                    setSwitchState={setOzlifeSwitch}
                />

                <NotiManageList
                    title={'기타 알림'}
                    switchState={extraSwitch}
                    setSwitchState={setExtraSwitch}
                />
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    notiManageBox: {
        marginTop: 17,
        borderTopColor: '#dddddd',
        borderTopWidth: 1
    }
})

export default NotiManageScreen;