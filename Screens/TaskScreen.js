import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ButtonWithNav from '../Components/ButtonWithNav';
import ButtonWithoutNav from '../Components/ButtonWithoutNav';

const TaskScreen = (props) => {
    const navigation = useNavigation();
    const route = useRoute();
    const [tasks, setTasks] = useState({});

    console.log(props);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                `https://kmaj-task-manager.herokuapp.com/task/${props.route.params.taskId}`,
                {
                    headers: {
                        Authorization: `Bearer ${props.route.params.routeParams.token}`,
                    },
                }
            );
            setTasks(result.data);
        };
        fetchData();
    }, []);

    const deleteTask = (id) => {
        axios
            .delete(
                `https://kmaj-task-manager.herokuapp.com/task/${props.route.params.taskId}`,
                {
                    headers: {
                        Authorization: `Bearer ${props.route.params.routeParams.token}`,
                    },
                }
            )
            .then((e) => {
                console.log(e.data);
                navigation.navigate('HomeScreen');
            })
            .catch((error) => console.log(error));
    };

    console.log(tasks.completed);

    const timestamp = new Date(tasks.createdAt);
    const time =
        timestamp.getDate() +
        '.' +
        '0' +
        timestamp.getMonth() +
        ' ' +
        timestamp.getHours() +
        ':' +
        timestamp.getMinutes();
    console.log(time);
    return (
        <View>
            <Text style={styles.description}>Description:</Text>
            <View style={styles.descriptionTextBox}>
                <Text style={styles.descriptionText}>{tasks.description}</Text>
            </View>

            <Text style={styles.description}>Created:</Text>
            <View style={styles.descriptionTextBox}>
                <Text style={styles.data}>{time[0] != 'N' ? time : ''}</Text>
            </View>
            <Text style={styles.description}>Completed:</Text>
            <View style={styles.descriptionTextBox}>
                <Text style={styles.descriptionText}>
                    {String(tasks.completed) == 'undefined'
                        ? ''
                        : String(tasks.completed)}
                </Text>
            </View>

            <ButtonWithNav
                navigateTo="EditTask"
                data={{
                    routeParams: route.params,
                    completed: tasks.completed,
                }}
            >
                Edytuj task
            </ButtonWithNav>
            <ButtonWithoutNav
                data={route.params}
                onClick={() => deleteTask(props.route.params.taskId)}
            >
                Usuń task
            </ButtonWithoutNav>
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
