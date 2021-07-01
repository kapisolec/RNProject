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
import ButtonWithoutNav from '../Components/ButtonWithoutNav';

const AddNewTask = (props) => {
    const navigation = useNavigation();
    console.log(props.route);

    const [state, setState] = useState({
        description: '',
        completed: false,
    });

    const handleAddingTask = async () => {
        if (state.description == '') return;
        console.log(state);
        try {
            const result = await axios.post(
                'https://kmaj-task-manager.herokuapp.com/task',
                state,
                {
                    headers: {
                        Authorization: `Bearer ${props.route.params.token}`,
                    },
                }
            );
            navigation.navigate('HomeScreen');
        } catch (error) {
            console.log(error);
        }
    };
    console.log(state);

    return (
        <View>
            <Text style={styles.title}>Add new task</Text>
            <TextInput
                placeholder="Task"
                style={styles.textInput}
                onChangeText={(text) =>
                    setState({ ...state, description: text })
                }
            />
            <Text style={styles.description}>Completed:</Text>
            <CheckBox
                style={styles.checkBoxInput}
                value={state.completed}
                onValueChange={(status) =>
                    setState({ ...state, completed: status })
                }
            />
            <ButtonWithoutNav onClick={handleAddingTask}>Add</ButtonWithoutNav>
        </View>
    );
};

const styles = StyleSheet.create({
    checkBoxInput: {
        alignSelf: 'center',
        borderRadius: 100,
        marginBottom: 100,
    },
    title: {
        fontSize: 36,
        // fontFamily: 'Helvetica',
        textAlign: 'center',
        marginTop: 30,
        color: '#f56618',
    },
    textInput: {
        alignSelf: 'center',
        paddingVertical: 10,
        width: 300,
        // paddingHorizontal: 150,
        backgroundColor: '#3c485c',
        marginTop: 120,
        fontSize: 18,
        fontWeight: '100',
        textAlign: 'center',
        borderRadius: 100,
    },

    description: {
        margin: 30,
        fontSize: 24,
        color: '#f56618',
        alignSelf: 'center',
    },
    descriptionText: {
        marginLeft: 30,
        marginRight: 30,
        fontSize: 18,
    },
    data: { marginLeft: 30, marginRight: 30, fontSize: 18 },
});

export default AddNewTask;
