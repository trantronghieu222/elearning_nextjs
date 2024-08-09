import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';


const initialState = {
    courseList: []
}

const courseReducer = createSlice({
    name: "courseReducer",
    initialState,
    reducers: {
        getCourseListAction: (state, action) => {
            state.courseList = action.payload;
        }
    }
});

export const { getCourseListAction } = courseReducer.actions

export default courseReducer.reducer

// ------------------------------------------------------------------------ //
const tokenCyber = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2NSIsIkhldEhhblN0cmluZyI6IjI1LzExLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTczMjQ5MjgwMDAwMCIsIm5iZiI6MTcwMjMxNDAwMCwiZXhwIjoxNzMyNjQwNDAwfQ._Cum2zMqV8nsbUfpCOe0ILWE_GvP8V8FQnmOR8PRB44';
export const getCourseListApi = () => {
    return async (dispatch) => {

        const res = await axios.get('https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc', {
            headers: {
                TokenCybersoft: tokenCyber
            }
        });
        const actionPayload = getCourseListAction(res.data);
        dispatch(actionPayload);
        // console.log(actionPayload)
    }
};

// export const getCourseListApi = () => {
//     return async (dispatch) => {
//         try {
//             const res = await axios.get('https://elearningnew.cybersoft.edu.vn/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc', {
//                 headers: {
//                     TokenCybersoft: tokenCyber
//                 }
//             });
//             console.log('API Response:', res.data);  // Kiểm tra phản hồi từ API
//             if (res.data && res.data.content) {
//                 const actionPayload = getCourseListAction(res.data.content);
//                 dispatch(actionPayload);
//             } else {
//                 console.error('Invalid API response:', res.data);
//             }
//         } catch (error) {
//             console.error('Error fetching course list:', error);
//         }
//     }
// };