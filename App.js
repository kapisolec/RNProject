import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeDB, clearDB } from './db';
import ButtonWithNav from './Components/ButtonWithNav.js';
import ButtonWithoutNav from './Components/ButtonWithoutNav.js';
import AddNewTask from './Screens/addNewTask';
import HomeScreen from './Screens/HomeScreen.js';
import Task from './Screens/Task.js';
import TaskScreen from './Screens/TaskScreen';
import Login from './Screens/Login';
import Register from './Screens/Register';

const Stack = createStackNavigator();

export default function App() {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        initializeDB().then((data) => setTasks(data));
    }, [tasks]);

    const taskArr = tasks.map((task) => {
        return (
            <Task key={task._id} data={task.date}>
                {task.task}
            </Task>
        );
    });

    const taskScreenArr = tasks.map((task) => {
        return (
            <Stack.Screen name={task.task} key={task._id}>
                {() => (
                    <TaskScreen
                        task={task.task}
                        description={task.description}
                        date={task.date}
                    />
                )}
            </Stack.Screen>
        );
    });

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name="Login" component={Login} /> */}
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen
                    name="HomeScreen"
                    options={{
                        headerLeft: false,
                    }}
                >
                    {() => (
                        <View>
                            <ScrollView>
                                {<HomeScreen>{taskArr}</HomeScreen>}
                            </ScrollView>
                            <View style={styles.buttonsContainer}>
                                <ButtonWithNav navigateTo="addNewTask">
                                    Add new task
                                </ButtonWithNav>
                                <ButtonWithoutNav
                                    onClick={() => {
                                        const result = clearDB();
                                        result === true
                                            ? setTasks([])
                                            : console.log(result);
                                    }}
                                >
                                    Delete all tasks
                                </ButtonWithoutNav>
                            </View>
                        </View>
                    )}
                </Stack.Screen>
                {taskScreenArr}
                <Stack.Screen name="addNewTask">
                    {() => <AddNewTask taskState={[tasks, setTasks]} />}
                </Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
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
