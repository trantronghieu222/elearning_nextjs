const TOKEN_AUTHOR = 'accessToken';
export const USER_LOGIN = 'userLogin';
// Lưu local storage dạng Json
const getDataTextStorage = (storeName) => {
    if (typeof window !== 'undefined' && localStorage.getItem(storeName)) {
        return localStorage.getItem(storeName);
    }
    return null;
}

// lấy local storage dạng Json
const getDataJsonStorage = (storeName) => {
    if (typeof window !== 'undefined' && localStorage.getItem(storeName)) {
        return JSON.parse(localStorage.getItem(storeName));
    }
    return null;
}

// Lưu Datastorage dạng text
const setDataTextStorage = (storeName, data) => {
    localStorage.setItem(storeName, data);
}

// lấy local storage dạng text
const setDataJsonStorage = (storeName, data) => {
    localStorage.setItem(storeName, JSON.stringify(data));
}

// Xoá khỏi local storage
const removeDataStorage = (storeName) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(storeName);
    }
}

// ----------------Hàm lưu cookie----------------
function createCookie(cookieName, cookieValue, daysToExpire) {
    const date = new Date();
    date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${cookieName}=${cookieValue}; ${expires}; path=/`;
}
// createCookie('username', 'l3m0n', 7); 

// ----------------Hàm get cookie----------------
const getTokenFromCookies = (context) => {
    // Import động 'cookies' từ 'next/headers' bên trong hàm
    const { cookies } = require('next/headers');
    const cookieStore = cookies();
    const tokenCookie = cookieStore.get(context);
    return tokenCookie ? tokenCookie.value : '';
};
// ----------------Hàm xoá cookie----------------
function deleteCookie(cookieName) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}
// deleteCookie('username');


export {
    getDataTextStorage,
    getDataJsonStorage,
    setDataTextStorage,
    setDataJsonStorage,
    removeDataStorage,
    createCookie,
    getTokenFromCookies,
    deleteCookie,
    TOKEN_AUTHOR
}