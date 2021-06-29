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
            backgroundColor: '#f56618',
            padding: 15,
            alignSelf: 'center',
            width: 250,
            borderRadius: 100,
            marginBottom: 20,
            marginHorizontal: 10,
            marginTop: 20,
        },
        text: {
            color: 'white',
            textAlign: 'center',
            fontSize: 18,
            fontWeight: 'bold',
        },
    });

    return (
        <TouchableOpacity
            style={props.style ? props.style : buttonStyle.item}
            onPress={() => navigation.navigate(props.navigateTo, props.data)}
        >
            <Text style={props.textStyle ? props.textStyle : buttonStyle.text}>
                {props.children}
            </Text>
        </TouchableOpacity>
    );
}

export default ButtonWithNav;
