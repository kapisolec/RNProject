import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import ButtonWithNav from '../Components/ButtonWithNav';
import ButtonWithoutNav from '../Components/ButtonWithoutNav';
import axios from 'axios';

function Login(props) {
    const navigation = useNavigation();
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const handleLogin = () => {
        if (state.email === '' || state.password === '') return;
        // console.log(state);
        axios
            .post('https://kmaj-task-manager.herokuapp.com/users/login', state)
            .then((e) => {
                // console.log(e.data);
                const dataToPass = e.data;
                navigation.navigate('MainScreen', dataToPass);
            })
            .catch((error) => console.log(error));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Please log in</Text>
            <View style={styles.inputContainer}>
                <View style={styles.loginDiv}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="email"
                        onChangeText={(text) =>
                            setState({ ...state, email: text })
                        }
                    ></TextInput>
                </View>
                <View style={styles.loginDiv}>
                    <TextInput
                        style={styles.inputs}
                        secureTextEntry
                        passwordRules="true"
                        placeholder="Password"
                        onChangeText={(text) =>
                            setState({ ...state, password: text })
                        }
                    ></TextInput>
                </View>
            </View>
            <ButtonWithoutNav
                style={styles.button}
                textStyle={styles.btnText}
                onClick={handleLogin}
            >
                Login
            </ButtonWithoutNav>
            <ButtonWithNav
                style={styles.buttonToLogin}
                textStyle={styles.btnText}
                navigateTo="Register"
            >
                Click here to register
            </ButtonWithNav>
        </View>
    );
}

const styles = StyleSheet.create({
    loginDiv: {
        marginVertical: 20,
        width: 300,
        alignSelf: 'center',
        borderRadius: 100,
    },
    container: {
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: '#282f3b',
        height: 1000,
    },
    title: {
        fontSize: 36,
        // fontFamily: 'Helvetica',
        textAlign: 'center',
        marginTop: 30,
        color: '#f56618',
    },
    text: {
        fontSize: 22,
        fontWeight: '100',
        textAlign: 'center',
    },
    inputs: {
        paddingVertical: 10,
        backgroundColor: '#3c485c',
        fontSize: 18,
        fontWeight: '100',
        textAlign: 'center',
        borderRadius: 100,
    },
    button: {
        backgroundColor: '#f56618',
        padding: 15,
        alignSelf: 'center',
        width: 250,
        borderRadius: 100,
        marginBottom: 20,
        marginHorizontal: 25,
        marginTop: 50,
    },
    buttonToLogin: {
        padding: 15,
        alignSelf: 'center',
        borderRadius: 100,
        marginBottom: 20,
        marginHorizontal: 25,
        marginTop: 50,
    },
    btnText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginTop: 100,
    },
});

export default Login;
