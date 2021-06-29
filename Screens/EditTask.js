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

const EditTask = (props) => {
    const navigation = useNavigation();
    console.log(props.route.params.routeParams.routeParams.token);

    const [state, setState] = useState({
        completed: props.route.params.completed,
    });

    const handleUpdateTask = () => {
        if (state.description == '') return;
        console.log(state);
        axios
            .patch(
                `https://kmaj-task-manager.herokuapp.com/task/${props.route.params.routeParams.taskId}`,
                state,
                {
                    headers: {
                        Authorization: `Bearer ${props.route.params.routeParams.routeParams.token}`,
                    },
                }
            )
            .then((e) => {
                // console.log(e.data);
                navigation.navigate('HomeScreen');
            })
            .catch((error) => console.log(error));
    };

    return (
        <View>
            <Text style={styles.description}>Completed:</Text>
            <CheckBox
                style={styles.textInput}
                value={state.completed}
                onValueChange={(status) =>
                    setState({ ...state, completed: status })
                }
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdateTask}>
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

export default EditTask;
