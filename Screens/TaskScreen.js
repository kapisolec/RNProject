import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TaskScreen = (props) => {
    return (
        <View>
            <Text style={styles.description}>Description:</Text>
            <View style={styles.descriptionTextBox}>
                <Text style={styles.descriptionText}>{props.description}</Text>
            </View>

            <Text style={styles.description}>Data ukończenia:</Text>
            <View style={styles.descriptionTextBox}>
                <Text style={styles.data}>Data ukończenia: {props.date}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    descriptionTextBox: {
        backgroundColor: '#FFF',
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    description: {
        margin: 30,
        marginBottom: 15,
        fontSize: 24,
    },
    descriptionText: {
        marginLeft: 30,
        marginRight: 30,
        fontSize: 18,
    },
    data: { marginLeft: 30, marginRight: 30, fontSize: 18 },
});

export default TaskScreen;
