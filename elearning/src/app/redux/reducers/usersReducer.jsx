import { createSlice } from '@reduxjs/toolkit'
import axios from "axios"
const initialState = {
    userList: []
}

const usersReducer = createSlice({
    name: "usersReducer",
    initialState,
    reducers: {
        getUserListAction: (state, action) => {
            state.userList = action.payload;
        }
    }
});

export const { getUserListAction } = usersReducer.actions

export default usersReducer.reducer

// ----------------------------------------------//
const TokenCybersoft = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCA2NSIsIkhldEhhblN0cmluZyI6IjI1LzExLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTczMjQ5MjgwMDAwMCIsIm5iZiI6MTcwMjMxNDAwMCwiZXhwIjoxNzMyNjQwNDAwfQ._Cum2zMqV8nsbUfpCOe0ILWE_GvP8V8FQnmOR8PRB44";
export const getUserListApi = () => {
    return async (dispatch) => {
        const res = await axios.get('https://elearningnew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDung', {
            headers: {
                TokenCybersoft: TokenCybersoft
            }
        });
        const actionPayload = getUserListAction(res.data);
        dispatch(actionPayload);
    }
}