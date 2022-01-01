import React from 'react';
import { Image, View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

import { useRoute } from '@react-navigation/native';
import OzlifeCommentCard from 'components/OzlifeCommentCard';

const OzlifeDetailScreen = () => {
    const route = useRoute();

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.top_info}>
                    <Image source={require('../../assets/noimage.png')}
                        style={styles.top_image} />
                    <Text numberOfLines={2} ellipsizeMode="tail" style={styles.top_text}>
                        애브샐러드 신메뉴 시식단 모집합니다. 애브샐러드 신     애브샐러드 신메뉴 시식단 모집합니다.     애브샐러드 신메뉴 시식단 모집합니다.    
                    </Text>
                    <TouchableOpacity style={styles.top_button}>
                        <Text style={{color: 'white', fontWeight: 'bold', }}>마감하기</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{width: '100%'}}>
                <View style={{marginTop: 24, paddingStart: 22, paddingEnd: 22,}}>
                    <Text>199개의</Text>
                    <Text>따뜻한 오지랖이 도착했어요!</Text>
                    <View style={{width: '100%', flexDirection: 'row', justifyContent: 'space-between', padding: 24, }}>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>120</Text>
                            <Text>오지라퍼</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>70</Text>
                            <Text>전문 오지라퍼</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Text style={{fontSize: 18, fontWeight: 'bold'}}>9</Text>
                            <Text>컨설턴트</Text>
                        </View>
                    </View>
                    <View style={{width: '100%', }}>
                        <OzlifeCommentCard />
                        <OzlifeCommentCard />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      flexDirection: 'column',
    },
    top_info: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    top_image: {
        width: 72,
        height: 48,
        resizeMode: 'contain',
        borderColor: '#000',
        borderWidth: 1,
    },
    top_text: {
        width: 165,
        fontWeight: 'bold',
        fontSize: 14,
        color: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    top_button: {
        backgroundColor: '#FF4444',
        width: 88,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center', 
    }
});

export default OzlifeDetailScreen;