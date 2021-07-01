import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ButtonWithoutNav from '../Components/ButtonWithoutNav';
import ButtonWithNav from '../Components/ButtonWithNav';

function EditAccount(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const [state, setState] = useState({
        email: route.params.user.email,
        password: '',
    });

    console.log(route.params.user.email);

    const handleAccountEdit = () => {
        console.log(state);
        if (state.email === '' && state.password === '') return;
        if (state.email === '') state.email = route.params.user.email;
        axios
            .patch('https://kmaj-task-manager.herokuapp.com/users/me', state, {
                headers: { Authorization: `Bearer ${route.params.token}` },
            })
            .then((e) => {
                navigation.navigate('MainScreen');
            })
            .catch((error) => console.log(error));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit account</Text>
            <View style={styles.inputContainer}>
                <View style={styles.loginDiv}>
                    <TextInput
                        style={styles.inputs}
                        passwordRules="true"
                        placeholder={route.params.user.email}
                        onChangeText={(text) =>
                            setState({ ...state, email: text })
                        }
                    ></TextInput>
                </View>
                <View style={styles.loginDiv}>
                    <TextInput
                        style={styles.inputs}
                        secureTextEntry={true}
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
                onClick={handleAccountEdit}
            >
                Submit
            </ButtonWithoutNav>
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
        // marginTop: 50,
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
export default EditAccount;
