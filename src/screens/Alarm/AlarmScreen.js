import React, { useState, useEffect, useRef } from 'react';
import { PermissionsAndroid, Platform, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, View, Text, TextInput, SafeAreaView, TouchableOpacity, Image, StyleSheet, Modal, Pressable } from 'react-native';

const AlarmScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,    
    backgroundColor: '#ffffff',
  },
  topBar: {
    flexDirection: 'row',
    height: 100,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
  },
  topText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  midText: {
    fontSize: 18,
    fontWeight: '500',
  },
  smallText: {
    fontSize: 16,
    fontWeight: '500',
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 10,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 20
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  modalView: {
    width: '100%',
    height: '100%',
    top: '10%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 50,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,
    backgroundColor: '#B993D6',
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textInput: {
    fontSize: 20,
    flexShrink: 1, 
    padding: 10,
  }
})

export default AlarmScreen;