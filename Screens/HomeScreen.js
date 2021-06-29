import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import Task from './Task';
import axios from 'axios';
import ButtonWithNav from '../Components/ButtonWithNav';

function HomeScreen(props) {
    const route = useRoute();
    const [tasks, setTasks] = useState([]);

    // console.log(route.params);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                'https://kmaj-task-manager.herokuapp.com/task',
                {
                    headers: { Authorization: `Bearer ${route.params.token}` },
                }
            );
            setTasks(result.data);
        };
        fetchData();
    }, [tasks]);

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
            <ButtonWithNav navigateTo="addNewTask" data={route.params}>
                Add new task
            </ButtonWithNav>
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
    circular: {
        width: 12,
        height: 12,
        borderColor: '#55BCF6',
        borderWidth: 2,
        borderRadius: 5,
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
        paddingBottom: 30,
    },
    taskWrapper: {
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    items: {
        marginTop: 30,
    },
});

export default HomeScreen;
