import tasksFromJson from './tasks.json';
import uuid from 'react-native-uuid';
import PouchDB from 'pouchdb-react-native';

export const initializeDB = async () => {
    const db = new PouchDB('tasks');
    const info = await db.info();
    if (info.doc_count === 0) {
        console.log('info empty');
        tasksFromJson.forEach(({ id, ...rest }) => {
            db.put({ _id: uuid.v4(), ...rest });
        });
    }

    const data = await db.allDocs().then((res) => {
        const rows = res.rows.map((row) => row.doc);
        return rows;
    });
    return data;
};

export const createTaskDocument = ({ ...rest }) => {
    const db = new PouchDB('tasks');
    try {
        db.put({ _id: uuid.v4(), ...rest });
        return true;
    } catch (error) {
        console.log(error);
    }
};

export const clearDB = () => {
    try {
        new PouchDB('tasks').destroy();
        return true;
    } catch (error) {
        console.log(error);
    }
};
