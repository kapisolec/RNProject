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
        '0' +
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
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionSubTitle}>Description:</Text>
                <View>
                    <Text style={styles.text}>{tasks.description}</Text>
                </View>

                <Text style={styles.sectionSubTitle}>Created:</Text>
                <View>
                    <Text style={styles.text}>
                        {time.startsWith('0N') ? '' : time}
                    </Text>
                </View>
                <Text style={styles.sectionSubTitle}>Completed:</Text>
                <View>
                    <Text style={styles.text}>
                        {String(tasks.completed) == 'undefined'
                            ? ''
                            : String(tasks.completed)}
                    </Text>
                </View>
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
    sectionTitle: {
        fontSize: 32,
        // fontFamily: 'Helvetica',
        textAlign: 'center',
        marginTop: 30,
        color: '#f56618',
    },
    sectionSubTitle: {
        fontSize: 24,
        // fontFamily: 'Helvetica',
        textAlign: 'center',
        marginTop: 30,
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

export default TaskScreen;
