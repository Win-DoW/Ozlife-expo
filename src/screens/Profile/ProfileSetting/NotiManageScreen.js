import React, {useState} from 'react';
import { View, Text, StyleSheet, Switch, SafeAreaView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from 'utils/Header';
import NotiManageList from 'components/ProfileComponents/NotiManageList';

const NotiManageScreen = ({ navigation, route }) => {

    const [chatSwitch, setChatSwitch] = useState(false);
    const [ozlifeSwitch, setOzlifeSwitch] = useState(false);
    const [extraSwitch, setExtraSwitch] = useState(false);
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
    }
})

export default NotiManageScreen;