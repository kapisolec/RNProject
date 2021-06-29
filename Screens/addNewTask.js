import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    CheckBox,
} from 'react-native';

const AddNewTask = (props) => {
    const navigation = useNavigation();
    console.log(props.route);

    const [state, setState] = useState({
        description: '',
        completed: false,
    });

    const handleAddingTask = () => {
        if (state.description == '') return;
        console.log(state);
        axios
            .post('https://kmaj-task-manager.herokuapp.com/task', state, {
                headers: {
                    Authorization: `Bearer ${props.route.params.token}`,
                },
            })
            .then((e) => {
                // console.log(e.data);
                navigation.navigate('HomeScreen');
            })
            .catch((error) => console.log(error));
    };
    console.log(state);

    return (
        <View>
            <Text style={styles.description}>Task:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={(text) =>
                    setState({ ...state, description: text })
                }
            />
            <Text style={styles.description}>Completed:</Text>
            <CheckBox
                style={styles.textInput}
                value={state.completed}
                onValueChange={(status) =>
                    setState({ ...state, completed: status })
                }
            />
            <TouchableOpacity style={styles.button} onPress={handleAddingTask}>
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
