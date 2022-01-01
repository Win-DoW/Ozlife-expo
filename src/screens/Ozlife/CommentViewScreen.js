import React, {useState, useEffect} from 'react'
import { Image, View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import Spinner from 'react-native-loading-spinner-overlay';

import { API, graphqlOperation, Storage, Auth } from 'aws-amplify';

import { createReview } from 'graphql/mutations';

const CommentViewScreen = (props) => {

    const ozlife = props.route.params.ozlife;
    const reviews = props.route.params.reviews;

    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation();    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });
    
        return unsubscribe;
    }, [navigation]);
    
    const fetchData = async () => {
        try {      
            setLoading(true);

            const userKey = await Auth.currentAuthenticatedUser({bypassCache: false});
            setUserId(userKey.attributes.sub);

            setLoading(false);
    
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    const next = async () => {
        try {
            setLoading(true);
      
            await API.graphql(graphqlOperation(createReview, { input: {
                reviewer: userId,
                reviews: reviews,
                ozlifeId: ozlife.id
            }}));
      
            setLoading(false);

            navigation.navigate("OzlifeProfile", {
                ozlifeId: ozlife.id
            })
           
          } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView>

                <Spinner
                    //visibility of Overlay Loading Spinner
                    visible={loading}
                    //Text with the Spinner
                    textContent={'Loading...'}
                    //Text style of the Spinner Text
                    textStyle={styles.spinnerTextStyle}
                />

                <View>
                    <View style={{ ...styles.rowContainer, ...styles.border}}>
                        <Image
                            source={{uri: ozlife.images}}
                            style={{width: 64, height: 48}}
                        />
                        <View style={{marginLeft: 20}}>
                            <Text style={styles.text, {fontWeight:'bold'}}>{ozlife.name}</Text>
                            <Text style={styles.text}>{ozlife.title}</Text>
                        </View>
                    </View>
                </View>

                {ozlife.question.map((question, index) => {
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

            <TouchableOpacity style={styles.button} onPress={next}>
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
        borderTopWidth: 1,
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