import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { screen } from 'utils/Styles';

import dayjs from "dayjs";

const Ozlife = ({ ozlife, userID, userReviews }) => {

    const navigation = useNavigation();

    const visit_date = ozlife.visit_date;
    const current_date = dayjs().format();
    const status = (visit_date.slice(0, 10) === current_date.slice(0, 10));
    const status_review = (userReviews.find(item => item.userID === userID));

    const goToOzlifeProfile = () => {
        navigation.navigate("OzlifeProfileScreen", {
            ozlife,
            userID,
            userReviews
        })
    }

    const goToOzlifeWrite = () => {
        navigation.navigate("CommentWriteScreen", {
            ozlife, userID, reviewID: status_review.id
        })
    }

    const goToOzlifeView = () => {
        navigation.navigate("CommentViewScreen", {
            reviews: status_review.reviews,
            ozlife,
            status: false,
        })
    }

    const goToOzlifeManage = () => {
        navigation.navigate("OzlifeManageScreen", {
            ozlife, userID
        })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={goToOzlifeProfile}>
            <Image
                resizeMode="contain"
                source={{uri: ozlife.image}}
                style={styles.image}
            />
            <View style={styles.textbox}>
                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                    <Text style={{fontSize: 12, fontWeight: '300', color: '#aaaaaa', marginRight: 3}}>{ozlife.tag}</Text>
                </View>
                <Text style={{fontSize: 14, fontWeight: '500'}}>{ozlife.store.name}</Text>
                <Text style={{fontSize: 14, fontWeight: '500'}}>{ozlife.title}</Text>

                {
                ozlife.userID === userID ?
                <TouchableOpacity style={{width: 133, height: 42, alignItems: 'center', justifyContent: 'center', backgroundColor: '#15b6f1', borderRadius: 10}} onPress={goToOzlifeManage}>
                    <Text style={{fontSize:14, color: 'white', fontWeight: 'bold'}}>오지랖 관리</Text>
                </TouchableOpacity>
                :
                status_review === undefined ?
                <TouchableOpacity onPress={goToOzlifeWrite} style={{width: 133, height: 42, alignItems: 'center', justifyContent: 'center', backgroundColor: '#15b6f1', borderRadius: 10}}>
                    <Text style={{fontSize:14, color: 'white', fontWeight: 'bold'}}>오지랖 작성</Text>
                </TouchableOpacity>
                :
                status_review.status === 1 ?
                <TouchableOpacity onPress={goToOzlifeView} style={{width: 133, height: 42, alignItems: 'center', justifyContent: 'center', backgroundColor: '#15b6f1', borderRadius: 10}}>
                    <Text style={{fontSize:14, color: 'white', fontWeight: 'bold'}}>오지랖 완료</Text>
                </TouchableOpacity>
                :
                <View>
                    <Text style={{fontSize: 14, fontWeight: 'bold', color: '#15b6f1'}}>{ozlife.name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', marginRight: 8}}>{ozlife.discount_price}원</Text>
                        <Text style={{fontSize: 12, fontWeight: '500', color: '#cccccc', textDecorationLine: 'line-through'}}>{ozlife.original_price}원</Text>  
                    </View>
                </View>
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#ffffff',
        marginBottom: 16,
        marginHorizontal: 20,
    },
    image: {
        width: screen.width*0.3,
        aspectRatio: 1,        
        marginRight: 16,
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: '#ccc'
    },
    textbox: {
        height: screen.width*0.3,
        justifyContent: 'space-around'
    }
})

export default Ozlife;