import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ButtonWithoutNav from '../Components/ButtonWithoutNav';
import ButtonWithNav from '../Components/ButtonWithNav';

function calculateTime(date) {
    let hours =
        String(date.getHours()).length > 1
            ? date.getHours()
            : '0' + date.getHours();
    let minutes =
        String(date.getMinutes()).length > 1
            ? date.getMinutes()
            : '0' + date.getMinutes();

    const time =
        '0' +
        date.getDate() +
        '.' +
        '0' +
        date.getMonth() +
        '.' +
        date.getFullYear() +
        ' ' +
        hours +
        ':' +
        minutes;
    return time;
}

function AccountInfo(props) {
    const route = useRoute();
    const [accountInfo, setAccountInfo] = useState({});

    // console.log(route.params);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(
                'https://kmaj-task-manager.herokuapp.com/users/me',
                {
                    headers: { Authorization: `Bearer ${route.params.token}` },
                }
            );
            setAccountInfo(result.data);
        };
        fetchData();
    }, []);

    let accountCreatedAt = new Date(accountInfo.createdAt);
    let accountUpdatedAt = new Date(accountInfo.updatedAt);
    accountCreatedAt = calculateTime(accountCreatedAt);
    accountUpdatedAt = calculateTime(accountUpdatedAt);
    route.params.user = { ...accountInfo };

    return (
        <View style={styles.container}>
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitleWhite}>
                    Witaj {accountInfo.name}!
                </Text>
                <Text style={styles.sectionSubTitle}>E-mail:</Text>
                <Text style={styles.text}>{accountInfo.email}</Text>
                <Text style={styles.sectionSubTitle}>Konto stworzono:</Text>
                <Text style={styles.text}>
                    {accountCreatedAt.startsWith('0N') ? '' : accountCreatedAt}
                </Text>
                <Text style={styles.sectionSubTitle}>
                    Ostatnia edycja konta:
                </Text>
                <Text style={styles.text}>
                    {accountUpdatedAt.startsWith('0N') ? '' : accountUpdatedAt}
                </Text>
            </View>
            <ButtonWithNav navigateTo="EditAccount" data={route.params}>
                Edytuj konto
            </ButtonWithNav>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 32,
        // fontFamily: 'Helvetica',
        textAlign: 'center',
        marginTop: 30,
        color: '#f56618',
    },
    sectionTitleWhite: {
        fontSize: 32,
        // fontFamily: 'Helvetica',
        textAlign: 'center',
        marginTop: 30,
        color: 'white',
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

export default AccountInfo;
