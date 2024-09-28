import axios from "axios";
import {getDataTextStorage, TOKEN_AUTHOR } from "./function";

const tokenCyber = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOb2RlSlMgNDMiLCJIZXRIYW5TdHJpbmciOiIyMi8wMS8yMDI1IiwiSGV0SGFuVGltZSI6IjE3Mzc1MDQwMDAwMDAiLCJuYmYiOjE3MTk0MjEyMDAsImV4cCI6MTczNzY1MTYwMH0.yD2N0oalf1e_BvxtjGSnop-j1KlY60H7R3mfNzGtB9Y";

const httpApiElearning = axios.create({
    baseURL: 'https://elearningnew.cybersoft.edu.vn',
    timeout: 30 * 1000
})

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

httpApiElearning.interceptors.response.use((res) => {
    return res;
}, err => {
    return Promise.reject(err);
})

export { httpApiElearning }