import { createSlice, nanoid } from '@reduxjs/toolkit'

export interface Project {
    id: string,
    title: string
}

const slice = createSlice({
    name: "projects",
    initialState: [] as Project[],
    reducers: {
        projectAdd: (state, action) => {
            state.push({
                id: nanoid(),
                title: action.payload.title
            })
        },
        projectRemove: (state, action) =>
            state.filter(project => project.id !== action.payload.id)

    }
})

export const { projectAdd, projectRemove } = slice.actions;
export default slice.reducer;