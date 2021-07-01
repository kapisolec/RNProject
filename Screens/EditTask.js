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
            <Text style={styles.sectionSubTitle}>Completed:</Text>
            <CheckBox
                value={state.completed}
                style={styles.sectionTitle}
                onValueChange={(status) =>
                    setState({ ...state, completed: status })
                }
            />
            <ButtonWithoutNav onClick={handleUpdateTask}>
                Submit
            </ButtonWithoutNav>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 32,
        // fontFamily: 'Helvetica',
        alignSelf: 'center',
        textAlign: 'center',
        marginVertical: 50,
        color: '#f56618',
    },
    sectionSubTitle: {
        fontSize: 24,
        // fontFamily: 'Helvetica',
        textAlign: 'center',
        marginTop: 120,
        color: '#f56618',
    },
    text: {
        color: 'white',
        fontSize: 22,
        fontWeight: '100',
        textAlign: 'center',
    },
    taskWrapper: {
        marginVertical: 40,
    },
});

export default EditTask;
