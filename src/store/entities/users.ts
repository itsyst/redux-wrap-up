import { createSlice, nanoid } from "@reduxjs/toolkit";

interface User {
    id: string;
    name: string;
}

const slice = createSlice({
    name: "users",
    initialState: [] as User[],
    reducers: {
        userAdd: (state, action) => {
            state.push({
                id: nanoid(),
                name: action.payload.name
            })
        }
    }
});

export const { userAdd } = slice.actions;
export default slice.reducer;