import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

function ButtonWithNav(props) {
    const navigation = useNavigation();
    const buttonStyle = StyleSheet.create({
        item: {
            backgroundColor: '#55BCF6',
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
            marginHorizontal: 25,
        },
        text: {
            textAlign: 'center',
            fontSize: 18,
            color: 'black',
        },
    });
    return (
        <TouchableOpacity
            style={props.style ? props.style : buttonStyle.item}
            onPress={() => navigation.navigate(props.navigateTo)}
        >
            <Text style={props.textStyle ? props.textStyle : buttonStyle.text}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
}

export default ButtonWithNav;
