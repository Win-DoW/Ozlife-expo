import React, {useState} from 'react';
import { View, Text, StyleSheet, Switch, SafeAreaView, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingNotiScreen = ({ navigation, route }) => {
    
    const [switchOn1, setSwitchOn1] = useState(true);
    const [switchOn2, setSwitchOn2] = useState(true);
    const [switchOn3, setSwitchOn3] = useState(false);
    const [switchOn4, setSwitchOn4] = useState(false);
    const [switchOn5, setSwitchOn5] = useState(false);
    const onToggleSwitch1 = () => setSwitchOn1(!switchOn1);
    const onToggleSwitch2 = () => setSwitchOn2(!switchOn2);
    const onToggleSwitch3 = () => setSwitchOn3(!switchOn3);
    const onToggleSwitch4 = () => setSwitchOn4(!switchOn4);
    const onToggleSwitch5 = () => setSwitchOn5(!switchOn5);

    const goToBack = () => {
        navigation.pop()
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>

            <View style={styles.header}>
                <TouchableOpacity style={styles.backIcon} onPress={goToBack}>
                    <Ionicons name="chevron-back-outline" size={32} color="#000000" />
                </TouchableOpacity>
                <Text style={styles.headerText}>알림</Text>
            </View>

            <View style={[styles.view, {marginTop: 17}]}>
                <Text style={styles.text}>채팅알림</Text>
                <Switch
                    value={switchOn1} 
                    onValueChange={onToggleSwitch1}
                    style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85}], marginRight: 16,}}
                    trackColor={{true: '#15b6f1', false: 'grey'}}/>
            </View>
            <View style={styles.subview}>
                <Text style={styles.text}>오지랖 도착 알림</Text>
                <Switch
                    value={switchOn2} 
                    onValueChange={onToggleSwitch2}
                    style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85}], marginRight: 16,}}
                    trackColor={{true: '#15b6f1', false: 'grey'}}/>
            </View>
            <View style={styles.subview}>
                <Text style={styles.text}>기타 알림</Text>
            </View>
            <View style={[styles.timeview, {marginTop: 17}]}>
                <View>
                    <Text style={styles.text}>방해금지 시간 설정</Text>
                    <Text style={styles.subtext}>08:00 ~ 20:00</Text>
                </View>
                <Switch
                    value={switchOn3} 
                    onValueChange={onToggleSwitch3}
                    style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85}], marginRight: 16,}}
                    trackColor={{true: '#15b6f1', false: 'grey'}}/>
            </View>
            <View style={[styles.view, {marginTop: 17}]}>
                <Text style={styles.text}>진동</Text>
                <Switch
                    value={switchOn4} 
                    onValueChange={onToggleSwitch4}
                    style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85}], marginRight: 16,}}
                    trackColor={{true: '#15b6f1', false: 'grey'}}/>
            </View>
            <View style={styles.subview}>
                <Text style={styles.text}>사운드</Text>
                <Switch
                    value={switchOn5} 
                    onValueChange={onToggleSwitch5}
                    style={{ transform: [{ scaleX: 0.85 }, { scaleY: 0.85}], marginRight: 16,}}
                    trackColor={{true: '#15b6f1', false: 'grey'}}/>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    view: {
        width: '100%',
        height: 56,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#dddddd',
        borderWidth: 1
    },
    subview: {
        width: '100%',
        height: 56,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1
    },
    timeview: {
        width: '100%',
        height: 72,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderColor: '#dddddd',
        borderWidth: 1
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 24
    },
    subtext: {
        fontSize: 14,
        fontWeight: '300',
        marginLeft: 24,
        color: '#aaaaaa',
        marginTop: 4
    },
    header: {
        width: '100%',
        height: 56,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 17,
        borderBottomColor: '#DDDDDD',
        borderBottomWidth: 1
    },
    backIcon: {
        position: 'absolute',
        left: 8
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
})

export default SettingNotiScreen;