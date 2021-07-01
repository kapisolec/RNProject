import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const Task = (props) => {
    const routeParams = props.routeParams;
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() =>
                navigation.navigate('TaskDetails', {
                    routeParams,
                    taskId: props._id,
                })
            }
        >
            <View style={styles.item}>
                <View style={styles.itemLeft}>
                    <TouchableOpacity style={styles.square}></TouchableOpacity>
                    <Text style={styles.itemText}>{props.children}</Text>
                    <Text style={styles.itemTextData}>
                        Utworzono: {props.data}
                    </Text>
                </View>
                <View
                    style={
                        props.completed === true
                            ? styles.circularDone
                            : styles.circularNotDone
                    }
                ></View>
            </View>
        </TouchableOpacity>
    );
};

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
        backgroundColor: '#f56618',
        opacity: 0.9,
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
    circularDone: {
        width: 12,
        height: 12,
        borderColor: 'green',
        borderWidth: 7,
        borderRadius: 5,
    },
    circularNotDone: {
        width: 12,
        height: 12,
        borderColor: 'red',
        borderWidth: 7,
        borderRadius: 5,
    },
});

export default Task;
