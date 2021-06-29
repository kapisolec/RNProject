import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    NavigationContainer,
    useNavigation,
    useRoute,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { initializeDB, clearDB } from './db';
import ButtonWithNav from './Components/ButtonWithNav.js';
import ButtonWithoutNav from './Components/ButtonWithoutNav.js';
import AddNewTask from './Screens/addNewTask';
import HomeScreen from './Screens/HomeScreen.js';
import Login from './Screens/Login';
import Register from './Screens/Register';
import MainScreen from './Screens/MainScreen';
import AccountInfo from './Screens/AccountInfo';
import EditAccount from './Screens/EditAccount';
import TaskScreen from './Screens/TaskScreen';
import EditTask from './Screens/EditTask';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerLeft: false,
                    }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{
                        headerLeft: false,
                    }}
                />
                <Stack.Screen
                    name="MainScreen"
                    component={MainScreen}
                    options={{
                        headerLeft: false,
                    }}
                />
                <Stack.Screen name="AccountInfo" component={AccountInfo} />
                <Stack.Screen name="EditAccount" component={EditAccount} />
                <Stack.Screen name="EditTask" component={EditTask} />
                <Stack.Screen name="HomeScreen">
                    {() => (
                        <View>
                            <ScrollView>{<HomeScreen />}</ScrollView>
                        </View>
                    )}
                </Stack.Screen>
                <Stack.Screen name="TaskDetails" component={TaskScreen} />

                <Stack.Screen name="addNewTask" component={AddNewTask} />
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
