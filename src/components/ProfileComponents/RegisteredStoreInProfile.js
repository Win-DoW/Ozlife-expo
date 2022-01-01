import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { Storage  } from 'aws-amplify';

const RegisteredStoreInProfile = ({ store, navigation }) => {

    const [storeMainImage, setStoreMainImage] = useState('')

    useEffect(() => {
        fetchImage();
    }, [])

    const fetchImage = async() => {
        try {
            const mainImage = await Storage.get(store.images[0])
            setStoreMainImage(mainImage)
        } catch (e) {
            console.log(e)
        }
    }

    const goToStoreProfile = () => {
        navigation.navigate('StoreProfileScreen', {
            store: store
        })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={goToStoreProfile}>
            <Image
                source={
                    storeMainImage == '' ?
                    require('../../../assets/ProfileImage/store_none_image.png')
                    :
                    { uri: storeMainImage }
                }
                style={styles.storeImage}
            />
            <View style={styles.storeInfoBox}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', lineHeight: 29 }}>
                    {store.name}
                </Text>
                <Text numberOfLines={2} style={{ fontSize: 14, lineHeight: 20, marginTop: 2 }}>
                    {store.profile}
                </Text>
            </View>
            <Feather name="chevron-right" size={30} color="black" />
        </TouchableOpacity>        
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8
    },
    storeImage: {
        width: 80,
        height: 88,
        borderRadius: 14,
        marginRight: 8,
    },
    storeInfoBox: {
        height: 88,
        flex: 1,
        justifyContent: 'center'
    }
})

export default RegisteredStoreInProfile;