import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;
const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        addUser: (users, action) => {
            users.push({
                id: ++lastId,
                name: action.payload.name
            })
        }
    }
})

export const { addUser } = userSlice.actions;
export default userSlice.reducer;