import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const QuestionListItem = (props) => {

    const questionData = props.data.item

    return (
        <View style={styles.container}>
            <View style={styles.questionBox}>
                <Text style={styles.questionHead}>Q{questionData.id}. </Text>
                <Text style={styles.questionContent}>{questionData.question}</Text>
            </View>
            <View style={{marginBottom: 15}}>
                <Text style={styles.contentStyle}>{questionData.answer}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        paddingLeft: 24,
        paddingRight: 20
    },
    questionBox: {
        flexDirection: 'row',
        marginBottom: 8
    },
    questionHead: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#15b6f1'
    },
    questionContent: {
        fontSize: 14,
        fontWeight: '500'
    },
    contentStyle: {
        fontSize: 14
    }
})

export default QuestionListItem;