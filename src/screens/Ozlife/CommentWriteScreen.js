import React, {useState, useEffect} from 'react'
import { Image, View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard, } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AppHeader from 'utils/Header';

const CommentWriteScreen = ({ navigation, route }) => {

    const ozlife = route.params.ozlife;
    const userID = route.params.userID;
    const reviewID = route.params.reviewID;
    const questions = ozlife.question;
    const [reviews, setReviews] = useState([]);
    
    const change = (value, index) => {
        let temp = reviews;
        temp[index] = value;
        setReviews(temp);
    }

    const next = async () => {
        navigation.navigate('CommentViewScreen', {
            reviews,
            ozlife,
            userID,
            reviewID,
            status: true,
        });
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == 'ios' ? 'padding' : 'null'}
        >
            <SafeAreaView style={styles.container}>

                <AppHeader
                    title={"오지랖 남기기"}
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
                                    <TextInput
                                        placeholder="답변을 작성해주세요."
                                        onChangeText = {(value) => change(value, index)}
                                        style={styles.textinput}
                                        multiline={true}
                                    />
                                </View>
                            </View>
                        )
                    })}                
                </ScrollView>

                <TouchableOpacity style={styles.button} onPress={next}>
                    <Text style={styles.buttontext}>미리 보기</Text>
                </TouchableOpacity>

            </SafeAreaView>
        </KeyboardAvoidingView>
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
    textinput: {
        fontSize: 14,
        paddingVertical: 10,
        color: '#666',
        borderBottomColor: '#dddddd',
        borderBottomWidth: 1,
    },
});

export default CommentWriteScreen;