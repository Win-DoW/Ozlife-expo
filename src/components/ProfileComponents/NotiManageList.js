import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';

const NotiManageList = ({ title, switchState, setSwitchState }) => {

    const valueChange = () => {
        setSwitchState(!switchState)
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Switch
          value={switchState}
          onValueChange={valueChange}
          style={{
            transform: [{ scaleX: 0.85 }, { scaleY: 0.85 }],
          }}
          trackColor={{ true: "#15b6f1", false: "#dddddd" }}
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        paddingLeft: 24,
        paddingRight: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#ddd',
        borderBottomWidth: 1
    },
    title: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 24
    }
})

export default NotiManageList;