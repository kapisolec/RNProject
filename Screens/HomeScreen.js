import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {
    useNavigation,
    useRoute,
    useFocusEffect,
} from '@react-navigation/native';
import { useState, useEffect } from 'react';
import Task from './Task';
import axios from 'axios';
import ButtonWithNav from '../Components/ButtonWithNav';

function HomeScreen(props) {
    const route = useRoute();
    const [tasks, setTasks] = useState([]);

    // console.log(route.params);

    useFocusEffect(() => {
        const fetchData = async () => {
            axios
                .get(
                    'https://kmaj-task-manager.herokuapp.com/task?sortBy=completed_desc',
                    {
                        headers: {
                            Authorization: `Bearer ${route.params.token}`,
                        },
                    }
                )
                .then((result) => setTasks(result.data));
        };
        fetchData();
    });

    const taskArr = tasks.map((task) => {
        let taskDate = new Date(task.createdAt);
        let hours =
            String(taskDate.getHours()).length > 1
                ? taskDate.getHours()
                : '0' + taskDate.getHours();
        let minutes =
            String(taskDate.getMinutes()).length > 1
                ? taskDate.getMinutes()
                : '0' + taskDate.getMinutes();

        const time =
            '0' +
            taskDate.getDate() +
            '.' +
            '0' +
            taskDate.getMonth() +
            ' ' +
            hours +
            ':' +
            minutes;
        return (
            <Task
                key={task._id}
                _id={task._id}
                completed={task.completed}
                data={time}
                routeParams={route.params}
            >
                {task.description}
            </Task>
        );
    });

    return (
        <View style={styles.container}>
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}>Tasks:</Text>
                <View style={styles.items}>{taskArr}</View>
            </View>
            <View style={styles.btnMargin}>
                <ButtonWithNav navigateTo="addNewTask" data={route.params}>
                    Add new task
                </ButtonWithNav>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#55BCF6',
        opacity: 0.4,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        maxWidth: '80%',
    },
    itemTextData: {
        maxWidth: '80%',
        marginLeft: 15,
    },

    buttonsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: '#eee',
        top: 550,
        alignSelf: 'center',
        paddingHorizontal: 50,
        paddingVertical: 30,
    },
    container: {
        flex: 1,
        flexGrow: 1,
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: '#282f3b',
    },
    taskWrapper: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        alignSelf: 'center',
        color: 'white',
        fontSize: 32,
        textAlign: 'center',
        marginTop: 30,
        color: '#f56618',
    },
    items: {
        marginTop: 30,
    },
    btnMargin: {
        marginBottom: 50,
    },
});

export default HomeScreen;
