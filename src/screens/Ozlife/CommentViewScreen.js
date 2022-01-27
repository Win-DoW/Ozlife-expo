import React, {useState, useEffect} from 'react'
import { Image, View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, SafeAreaView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { updateReview } from 'graphql/mutations';
import { API, graphqlOperation, Storage, Auth } from 'aws-amplify';
import AppHeader from 'utils/Header';

import { createAlarm } from 'utils/Alarm';

const CommentViewScreen = ({ navigation, route }) => {

    const ozlife = route.params.ozlife;
    const userID = route.params.userID;
    const reviewID = route.params.reviewID;
    const questions = ozlife.question;
    const reviews = route.params.reviews;

    const status = route.params.status;

    const newComment = async () => {
        try {
            await API.graphql(graphqlOperation(updateReview, { input: {
                id: reviewID,
                status: 1,
                reviews,
                userID,
                ozlifeID: ozlife.id
            }}));

            await createAlarm(ozlife.userID, '오지랖 후기', `${ozlife.name} 오지랖 후기가 들어왔습니다.`, ozlife.images[0]);
        
            navigation.navigate('MainTab', { screen: 'OzlifeScreen' });
        
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <SafeAreaView style={styles.container}>

            <AppHeader
                title={"오지랖 보기"}
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
                                    <Text style={{...styles.title, color: '#15b6f1'}}>Q{index+1}. </Text>
                                    <Text style={styles.title}>{question}</Text>
                                </View>
                                <Text style={styles.answer}>{reviews[index]}</Text>
                            </View>
                        </View>
                    )
                })}
                
            </ScrollView>

            {status ?
            <TouchableOpacity style={styles.button} onPress={() => newComment()}>
                <Text style={styles.buttontext}>작성 완료</Text>
            </TouchableOpacity>
            :
            null
            }

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
        fontWeight: '700',
        color: '#000',
    },
    text: {
        fontSize: 14,
        fontWeight: '500'
    },
    button: {
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
    answer: {
        fontSize: 14,
        marginTop: 8,
    },
});

export default CommentViewScreen;