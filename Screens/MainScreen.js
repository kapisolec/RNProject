import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ButtonWithNav from '../Components/ButtonWithNav';

function MainScreen(props) {
    const route = useRoute();
    console.log(route.params);
    return (
        <View style={styles.container}>
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}>Gdzie chcesz przejść:</Text>
                <ButtonWithNav
                    style={styles.buttonToLogin}
                    textStyle={styles.btnText}
                    navigateTo="HomeScreen"
                    data={route.params}
                >
                    Zobacz taski
                </ButtonWithNav>
                <ButtonWithNav
                    style={styles.buttonToLogin}
                    textStyle={styles.btnText}
                    navigateTo="AccountInfo"
                    data={route.params}
                >
                    Edytuj konto
                </ButtonWithNav>
                <ButtonWithNav
                    style={styles.buttonToLogin}
                    textStyle={styles.btnText}
                    navigateTo="Login"
                >
                    Wyloguj
                </ButtonWithNav>
            </View>
        </View>
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
        alignContent: 'center',
        textAlign: 'center',
        backgroundColor: '#282f3b',
        height: 1000,
    },
    taskWrapper: {
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    sectionTitle: {
        alignSelf: 'center',
        marginBottom: 100,
        color: 'white',
        fontSize: 32,
        textAlign: 'center',
        marginTop: 30,
        color: '#f56618',
    },
    items: {
        marginTop: 30,
    },
});

export default MainScreen;
