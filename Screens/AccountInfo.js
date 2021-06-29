import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import ButtonWithoutNav from '../Components/ButtonWithoutNav';
import ButtonWithNav from '../Components/ButtonWithNav';

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
    console.log(accountInfo);
    return (
        <View style={styles.container}>
            <View style={styles.taskWrapper}>
                <Text style={styles.sectionTitle}>
                    Witaj {accountInfo.name}
                </Text>
                <Text style={styles.sectionTitle}>E-mail:</Text>
                <Text>{accountInfo.email}</Text>
                <Text style={styles.sectionTitle}>Konto stworzono:</Text>
                <Text>{accountInfo.createdAt}</Text>
                <Text style={styles.sectionTitle}>Ostatnia edycja konta:</Text>
                <Text>{accountInfo.updatedAt}</Text>
                <ButtonWithNav navigateTo="EditAccount" data={route.params}>
                    Edytuj konto
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

export default AccountInfo;
