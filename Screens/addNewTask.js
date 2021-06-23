import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';

import { createTaskDocument } from '../db';

const AddNewTask = () => {
    const [state, setState] = useState({
        description: '',
        task: '',
        date: '',
    });

    return (
        <View>
            <Text style={styles.description}>Task:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setState({ ...state, task: text })}
            />
            <Text style={styles.description}>Description:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) =>
                    setState({ ...state, description: text })
                }
            />
            <Text style={styles.description}>Data ukończenia:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) => setState({ ...state, date: text })}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    const resultsOfEvery = Object.values(state).every(
                        (el) => el.trim() !== '' && el.trim().length > 0
                    );
                    if (resultsOfEvery === false) return 0;
                    const results = createTaskDocument(state);
                    console.log(results);
                }}
            >
                <Text>Add</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#55BCF6',
        padding: 15,
        paddingHorizontal: 60,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 30,
        alignSelf: 'center',
    },
    textInput: {
        textAlign: 'center',
        height: 60,
        fontSize: 18,
        backgroundColor: '#FFF',
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginHorizontal: 30,
        paddingHorizontal: 25,
    },
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
        marginLeft: 30,
        marginTop: 5,
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

export default AddNewTask;
