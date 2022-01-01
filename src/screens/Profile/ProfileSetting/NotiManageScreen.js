import React, {useState} from 'react';
import { View, Text, StyleSheet, Switch, SafeAreaView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from 'utils/Header';
import NotiManageList from 'components/ProfileComponents/NotiManageList';

const NotiManageScreen = ({ navigation, route }) => {

    const [chatSwitch, setChatSwitch] = useState(false);
    const [ozlifeSwitch, setOzlifeSwitch] = useState(false);
    const [extraSwitch, setExtraSwitch] = useState(false);
    const [timeSwitch, setTimeSwitch] = useState(false);
    const [vibration, setVibration] = useState(false);
    const [sound, setSound] = useState(false);

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

            <View style={{ marginTop: 17}}>
                <View style={styles.timeBox}>
                    <View>
                        <Text style={styles.title}>방해금지 시간 설정</Text>
                        <Text style={styles.time}>08:00 ~ 20:00</Text>
                    </View>
                    <Switch
                    value={timeSwitch}
                    onValueChange={() => setTimeSwitch(!timeSwitch)}
                    style={{
                        transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
                    }}
                    trackColor={{ true: "#15b6f1", false: "#dddddd" }}
                    />
                </View>
            </View>

            <View style={styles.notiManageBox}>
                <NotiManageList
                    title={'진동'}
                    switchState={vibration}
                    setSwitchState={setVibration}
                />

                <NotiManageList
                    title={'사운드'}
                    switchState={sound}
                    setSwitchState={setSound}
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
    },
    timeBox: {
        paddingVertical: 16,
        paddingLeft: 24,
        paddingRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#dddddd',
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24
    },
    time: {
        fontSize: 14,
        fontWeight: '300',
        color: '#aaaaaa',
        lineHeight: 20,
        marginTop: 4
    }
})

export default NotiManageScreen;