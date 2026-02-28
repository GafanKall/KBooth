import { useMemo } from 'react';
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

// Stable functions defined outside the hook
const saveToDb = async (photoData) => {
    const db = await dbPromise;
    return db.add(STORE_NAME, {
        ...photoData,
        createdAt: new Date().toISOString(),
    });
};

const getPhotosFromDb = async () => {
    const db = await dbPromise;
    return db.getAll(STORE_NAME);
};

const deletePhotoFromDb = async (id) => {
    const db = await dbPromise;
    return db.delete(STORE_NAME, id);
};

export const useStorage = () => {
    // Return a memoized object to ensure stable function references
    return useMemo(() => ({
        savePhoto: saveToDb,
        getPhotos: getPhotosFromDb,
        deletePhoto: deletePhotoFromDb,
    }), []);
};
