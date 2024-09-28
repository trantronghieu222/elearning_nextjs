const TOKEN_AUTHOR = 'accessToken';
export const USER_LOGIN = 'userLogin';

const getDataTextStorage = (storeName) => {
    if (typeof window !== 'undefined' && localStorage.getItem(storeName)) {
        return localStorage.getItem(storeName);
    }
    return null;
}

const getDataJsonStorage = (storeName) => {
    if (typeof window !== 'undefined' && localStorage.getItem(storeName)) {
        return JSON.parse(localStorage.getItem(storeName));
    }
    return null;
}

const setDataTextStorage = (storeName, data) => {
    localStorage.setItem(storeName, data);
}

const setDataJsonStorage = (storeName, data) => {
    localStorage.setItem(storeName, JSON.stringify(data));
}

const removeDataStorage = (storeName) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(storeName);
    }
}



export {
    getDataTextStorage,
    getDataJsonStorage,
    setDataTextStorage,
    setDataJsonStorage,
    removeDataStorage,
    TOKEN_AUTHOR
}