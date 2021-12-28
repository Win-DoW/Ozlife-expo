import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import styles from './styles';

const Ozlife = ({ ozlife, userId }) => {

    const navigation = useNavigation();

    const visitDate = new Date(ozlife.visit_date).toLocaleString('ko-KR');
    const currentDate = new Date().toLocaleString('ko-KR');

    const goToOzlifeProfile = () => {
        navigation.navigate("OzlifeProfile", {
            ozlifeId: ozlife.id
        })
    }

    const goToOzlifeWrite = () => {
        navigation.navigate("OzlifeWriteComment", {
            ozlifeId: ozlife.id
        })
    }

    const goToOzlifeManage = () => {
        navigation.navigate("OzlifeManage")
    }

    return (
        <TouchableOpacity style={styles.container} onPress={goToOzlifeProfile}>
            <Image
                source={{uri: ozlife.images}}
                style={styles.image}
            />
            <View style={styles.textbox}>
                <View style={{flexDirection: 'row', alignItems: 'center',}}>
                    <Text style={{fontSize: 12, fontWeight: '300', color: '#aaaaaa', marginRight: 3}}>{ozlife.tag}</Text>
                </View>
                <Text style={{fontSize: 14, fontWeight: '500'}}>{ozlife.store.name}</Text>
                <Text style={{fontSize: 14, fontWeight: '500'}}>{ozlife.title}</Text>

                {
                    ozlife.owner === userId ?

                    <TouchableOpacity style={{width: 133, height: 42, alignItems: 'center', justifyContent: 'center', backgroundColor: '#15b6f1', borderRadius: 10}} onPress={goToOzlifeManage}>
                        <Text style={{fontSize:14, color: 'white', fontWeight: 'bold'}}>오지랖 관리</Text>
                    </TouchableOpacity>

                    :

                    visitDate.slice(0,10) === currentDate.slice(0,10) && visitDate.slice(-4) === currentDate.slice(-4) ?

                    <TouchableOpacity onPress={goToOzlifeWrite} style={{width: 133, height: 42, alignItems: 'center', justifyContent: 'center', backgroundColor: '#15b6f1', borderRadius: 10}}>
                        <Text style={{fontSize:14, color: 'white', fontWeight: 'bold'}}>오지랖 남기기</Text>
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

export default Ozlife;