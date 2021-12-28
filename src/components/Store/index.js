import React from 'react';
import { Pressable, Text, View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Store = ({ store }) => {
    
    const navigation = useNavigation();

    const goToStoreProfile = () => {
        navigation.navigate("StoreProfileScreen", {
            store
        })
    }

    return (
        <Pressable style={styles.container} onPress={() => goToStoreProfile()}>
            <Image
                source={{uri: store.images}}
                style={styles.image}
            />
            <View style={styles.textbox}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{store.name}</Text>
                <Text numberOfLines={2} style={{fontSize: 14, marginTop: 2}}>{store.profile}</Text>
            </View>
            <View style={styles.press}>
                <Ionicons name="chevron-forward-outline" size={24} color="#000000" />
            </View>
        </Pressable>        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20,
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center'
    },
    image: {
        height: 80,
        aspectRatio: 1/1,
        marginRight: 20,
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