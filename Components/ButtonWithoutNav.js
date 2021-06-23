import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

function ButtonWithoutNav(props) {
    const buttonStyle = StyleSheet.create({
        item: {
            backgroundColor: '#55BCF6',
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
            marginHorizontal: 25,
        },
    });
    return (
        <TouchableOpacity style={buttonStyle.item} onPress={props.onClick}>
            <Text>{props.children}</Text>
        </TouchableOpacity>
    );
}

export default ButtonWithoutNav;
