import React from 'react';
import { Pressable, Text, View, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { screen } from 'utils/Styles';

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
                resizeMode="contain"
                source={{uri: store.image}}
                style={styles.image}
            />
            <View style={styles.textbox}>
                <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 8}}>{store.name}</Text>
                <Text numberOfLines={2} style={{fontSize: 14, color: '#aaa', marginTop: 8, height: 40}}>{store.profile}</Text>
            </View>
        </Pressable>        
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flexDirection: 'row',
        marginBottom: 14,
        alignItems: 'center'
    },
    image: {
        width: screen.width*0.25,
        aspectRatio: 1,
        marginRight: 20,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#ccc'
    },
    textbox: {
        flex: 1,
        height: screen.width*0.25,
        justifyContent: 'center'
    },
})

export default Store;