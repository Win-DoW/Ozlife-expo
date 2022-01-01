import React, {useState, useEffect} from 'react'
import { Image, View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppHeader from 'utils/Header';

const CommentViewScreen = ({ navigation, route }) => {

    const ozlife = route.params.ozlife;
    const userID = route.params.userID;
    const questions = ozlife.question;
    const reviews = route.params.reviews;


    return (
        <SafeAreaView style={styles.container}>

            <AppHeader
                title={"오지랖 미리보기"}
                noIcon={false}
                leftIcon={<Ionicons name="chevron-back-outline" size={32} color="black" />}
                leftIconPress={() => navigation.goBack()}
            />

            <View style={{ ...styles.rowContainer, ...styles.border}}>
                <Image
                    source={{uri: ozlife.image}}
                    style={{width: 64, height: 48}}
                />
                <View style={{marginLeft: 20}}>
                    <Text style={styles.text, {fontWeight:'bold'}}>{ozlife.name}</Text>
                    <Text style={styles.text}>{ozlife.title}</Text>
                </View>
            </View>

            <ScrollView>

                {questions.map((question, index) => {
                    return (
                        <View style={styles.section} key={index}>
                            <View>
                                <View style={styles.rowContainer}>
                                    <Text style={styles.title, {color: '#15b6f1'}}>Q{index+1}</Text>
                                    <Text style={styles.title, {marginLeft: 5}}>{question}</Text>
                                </View>
                                <Text>{reviews[index]}</Text>
                            </View>
                        </View>
                    )
                })}
                
            </ScrollView>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttontext}>작성 완료</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'flex-start', 
        backgroundColor: '#FFFFFF'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    border: {
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    section: {
        margin: 20,
    },    
    title: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
    },
    text: {
        fontSize: 14,
        fontWeight: '500'
    },
    button: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 60,
        backgroundColor: '#15b6f1',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttontext: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff'
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
});

export default CommentViewScreen;