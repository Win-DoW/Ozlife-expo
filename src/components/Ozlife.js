import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { screen } from 'utils/Styles';

import dayjs from "dayjs";

const Ozlife = ({ ozlife, userID, userReviews, state = false }) => {

    const navigation = useNavigation();

    const visit_date = ozlife.visit_date;
    const current_date = dayjs().format();
    const status = (visit_date.slice(0, 10) === current_date.slice(0, 10));
    const status_review = (userReviews.find(item => item.ozlifeID === ozlife.id));

    const toDay = {
        0 : '월',
        1 : '화',
        2 : '화',
        3 : '수',
        4 : '목',
        5 : '금',
        6 : '토',
    };
    const D_day = dayjs(visit_date).diff(dayjs(current_date), "day");
    const D_date = visit_date.slice(5,10).replace('-', '/') + "(" + toDay[dayjs(visit_date).day()]  + ")";

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

            { state &&
            <View style={styles.coverImage}>
                { D_day >= 0 ?
                <Text style={styles.coverText}>D-{D_day}</Text>
                :
                <Text style={styles.coverText}>D+{D_day*(-1)}</Text>
                }
                <Text style={styles.coverDate}>{D_date}</Text>
            </View>
            }


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
                <View>
                    <Text style={{fontSize: 14, fontWeight: 'bold', color: '#15b6f1'}}>{ozlife.name}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', marginRight: 8}}>{ozlife.discount_price}원</Text>
                        <Text style={{fontSize: 12, fontWeight: '500', color: '#cccccc', textDecorationLine: 'line-through'}}>{ozlife.original_price}원</Text>  
                    </View>
                </View>
                :
                status_review.status === 0 ?
                (status ? 
                <TouchableOpacity onPress={goToOzlifeWrite} style={{width: 133, height: 42, alignItems: 'center', justifyContent: 'center', backgroundColor: '#15b6f1', borderRadius: 10}}>
                    <Text style={{fontSize:14, color: 'white', fontWeight: 'bold'}}>오지랖 작성</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={{width: 133, height: 42, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ccc', borderRadius: 10}}>
                    <Text style={{fontSize:14, color: 'white', fontWeight: 'bold'}}>오지랖 예약중</Text>
                </TouchableOpacity>
                )
                :
                <TouchableOpacity onPress={goToOzlifeView} style={{width: 133, height: 42, alignItems: 'center', justifyContent: 'center', backgroundColor: '#15b6f1', borderRadius: 10}}>
                    <Text style={{fontSize:14, color: 'white', fontWeight: 'bold'}}>오지랖 완료</Text>
                </TouchableOpacity>
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
    coverImage: {
        width: screen.width*0.3,
        aspectRatio: 1,        
        marginRight: 16,
        borderRadius: 16,
        borderWidth: 0.5,
        borderColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(17, 17, 17, 0.4)',
        zIndex: 1,
        position: 'absolute',
    },
    coverText: { 
        fontSize: 24,
        fontWeight: '900',
        color: '#ffffff',
    },
    coverDate: { 
        fontSize: 14,
        fontWeight: '900',
        color: '#ffffff',
        marginTop: 8,
    },
    textbox: {
        height: screen.width*0.3,
        justifyContent: 'space-around'
    }
})

export default Ozlife;