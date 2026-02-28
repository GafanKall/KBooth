import { openDB } from 'idb';

const DB_NAME = 'kbooth-db';
const STORE_NAME = 'photos';

const dbPromise = openDB(DB_NAME, 1, {
    upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
        }
    },
});

export const useStorage = () => {
    const savePhoto = async (photoData) => {
        const db = await dbPromise;
        return db.add(STORE_NAME, {
            ...photoData,
            createdAt: new Date().toISOString(),
        });
    };

    const getPhotos = async () => {
        const db = await dbPromise;
        return db.getAll(STORE_NAME);
    };

    const deletePhoto = async (id) => {
        const db = await dbPromise;
        return db.delete(STORE_NAME, id);
    };

    return {
        savePhoto,
        getPhotos,
        deletePhoto,
    };
};
