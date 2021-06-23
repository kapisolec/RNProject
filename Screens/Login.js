import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ButtonWithNav from '../Components/ButtonWithNav';

function Login(props) {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Please log in</Text>
            <View style={styles.inputContainer}>
                <View style={styles.loginDiv}>
                    <TextInput
                        style={styles.inputs}
                        placeholder="Login"
                    ></TextInput>
                </View>
                <View style={styles.loginDiv}>
                    <TextInput
                        style={styles.inputs}
                        passwordRules="true"
                        placeholder="Password"
                    ></TextInput>
                </View>
            </View>
            <ButtonWithNav
                style={styles.button}
                textStyle={styles.btnText}
                navigateTo="HomeScreen"
            >
                Login
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
        fontSize: 40,
        fontWeight: 'bold',
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
