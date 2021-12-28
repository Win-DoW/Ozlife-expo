import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Storage, API, Auth, graphqlOperation } from 'aws-amplify';

const Store = ({ store, navigation }) => {

    const [image, setImage] = useState('')

    useEffect(() => {
        fetchImages();
    }, [])

    const fetchImages = async() => {
        try {
            const firstImage = await Storage.get(store.images[0])
            setImage(firstImage)
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
                source={image == '' ? require('../../../assets/ProfileImage/store_none_image.png') : { uri: image }}
                style={styles.image}
            />
            <View style={styles.textbox}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{store.name}</Text>
                <Text numberOfLines={2} style={{fontSize: 14, marginTop: 2}}>{store.profile}</Text>
            </View>
            <View style={styles.press}>
                <Ionicons name="chevron-forward-outline" size={24} color="#000000" />
            </View>
        </TouchableOpacity>        
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center'
    },
    image: {
        width: 80,
        aspectRatio: 1/1,
        marginRight: 8,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#ccc'
    },
    textbox: {
        height: 88,
        flex: 1,
        justifyContent: 'center'
    },
    press: {
        width: 32,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10
    },
    button: {
        width: 9,
        height: 15.7
    }
})

export default Store;