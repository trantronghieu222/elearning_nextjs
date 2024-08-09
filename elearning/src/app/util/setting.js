import axios from "axios";
// import { cookies } from 'next/headers'
import {getDataTextStorage, getTokenFromCookies, TOKEN_AUTHOR } from "./function";
const tokenCyber = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2NSIsIkhldEhhblN0cmluZyI6IjI1LzExLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTczMjQ5MjgwMDAwMCIsIm5iZiI6MTcwMjMxNDAwMCwiZXhwIjoxNzMyNjQwNDAwfQ._Cum2zMqV8nsbUfpCOe0ILWE_GvP8V8FQnmOR8PRB44";

/* Khai báo interceptor */
const httpApiElearning = axios.create({
    baseURL: 'https://elearningnew.cybersoft.edu.vn',
    timeout: 30 * 1000
})

/* Cấu hình interceptor req để gửi đi */
httpApiElearning.interceptors.request.use((req) => {
    let token;
    token = getDataTextStorage(TOKEN_AUTHOR);
    req.headers = {
        ...req.headers,
        Authorization: `Bearer ${token}`,
        TokenCybersoft: tokenCyber 
    };

    return req;
}, err => {
    return Promise.reject(err);
});

// httpApiElearning.interceptors.request.use((req) => {
//     let token;

//     if (typeof window !== 'undefined') {
//         // Môi trường client
//         token = getDataTextStorage(TOKEN_AUTHOR);
//     } else {
//         // Môi trường server
//         token = getTokenFromCookies(TOKEN_AUTHOR);
//     }
    
//     req.headers = {
//         ...req.headers,
//         Authorization: `Bearer ${token}`,
//         TokenCybersoft: tokenCyber
//     };

//     return req;
// }, err => {
//     return Promise.reject(err);
// });

/* Cấu hình intorceptor nhân kết quả trả về */
httpApiElearning.interceptors.response.use((res) => {
    return res;
}, err => {
    return Promise.reject(err);
})

export { httpApiElearning }