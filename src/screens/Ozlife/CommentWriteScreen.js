import React, {useState, useEffect} from 'react'
import { Image, View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, SafeAreaView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import Spinner from 'react-native-loading-spinner-overlay';

import { API, graphqlOperation, Storage, Auth } from 'aws-amplify';

import { listOzlives } from '../../graphql/queries';

const CommentWriteScreen = (props) => {

    const ozlifeId = props.route.params.ozlifeId;

    const [loading, setLoading] = useState(false);
    const [ozlife, setOzlife] = useState({});
    const [questions, setQuestions] = useState([]); 
    const [review, setReview] = useState([]);

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

            const data = await API.graphql(graphqlOperation(listOzlives, { filter: { id: { eq: ozlifeId }}}));
            const ozlife = data.data.listOzlives.items[0]
            const result = await Storage.get(ozlife.images[0]);

            setOzlife({...ozlife, images: result})
            setQuestions(ozlife.question)

            setLoading(false);
    
        } catch (e) {
            setLoading(false);
            console.log(e);
        }
    }
    
    const change = (value, index) => {
        let reviews = review;
        reviews[index] = value;
        setReview(reviews);
    }

    const next = async () => {
        navigation.navigate('OzlifeWriteCommentView',{
            reviews: review,
            ozlife: ozlife                
        });
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

export default CommentWriteScreen;