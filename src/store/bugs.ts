// Action types
const ADD_BUG = "ADD_BUG";
const REMOVE_BUG = "REMOVE_BUG";
const RESOLVE_BUG = "RESOLVE_BUG";


// Action creators
export const addBug = (description: string) => ({
    type: ADD_BUG,
    payload: {
        description: description
    }
})

export const removeBug = (id: number) => ({
    type: REMOVE_BUG,
    payload: {
        id: id
    }
})

export const resolveBug = (id: number) => ({
    type: RESOLVE_BUG,
    payload: {
        id: id,
    }
})

// Reducer
let lastId = 0;

export const reducer = (state: any[] = [], action: any) => {
    switch (action.type) {
        case ADD_BUG:
            return [
                ...state,
                {
                    id: ++lastId,
                    description: action.payload.description,
                    resolved: false
                }
            ];

        case REMOVE_BUG:
            return state.filter(bug => bug.id !== action.payload.id);

        case RESOLVE_BUG:
            return state.map(bug => bug.id !== action.payload.id ? bug : { ...bug, resolved: true })

        default:
            return state;
    }
}

