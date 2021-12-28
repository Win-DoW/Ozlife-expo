import React, { useState } from "react";
import { TouchableOpacity, View, Button, Text, StyleSheet } from "react-native";
import { RadioButton, DefaultTheme } from 'react-native-paper';



const SignUpRadioButton = () => {
    const [value, setValue] = React.useState('first');

    return (
      <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value}>
        <View >
          <Text>First</Text>
          <RadioButton value="first" color= '#2CC3F2'/>
        </View>
        <View>
          <Text>Second</Text>
          <RadioButton value="second" color= '#2CC3F2'/>
        </View>
      </RadioButton.Group>
    );
  };
  
  export default SignUpRadioButton;