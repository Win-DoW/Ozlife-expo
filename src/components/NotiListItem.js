import React from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'

const NotiListItem = (props) => {

    const {notice} = props;

    const notiClick = () => {
        console.log("읽음")
    }

    return (
        <View style={{alignItems: 'center'}}>
            <Pressable 
                style={[styles.container, {backgroundColor: notice.read_status ? '#ffffff' : 'rgba(21, 182, 241, 0.15)'}]}
                onPress={notiClick}
            >
                <Image
                    source={{uri: notice.img_src}}
                    style={styles.image}
                />
                <View style={styles.textview}>
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>{notice.noti.type}</Text>
                    <Text style={{fontSize: 14, color: '#777777'}}>{notice.noti.message}</Text>
                    <Text style={{fontSize: 12, color: '#aaaaaa'}}>{notice.createdAt}</Text>
                </View>
            </Pressable>
            <View style={styles.underline}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        alignItems: 'center'
    },
    underline: {
        width: '88%',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1
    },
    image: {
        width: 56,
        height: 56,
        borderRadius: 5,
        marginLeft: 20
    },
    textview: {
        marginLeft: 12,
        justifyContent: 'space-around',
        height: 56,
    }
})

export default NotiListItem