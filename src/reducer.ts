import * as actions from "./actionTypes";

let lastId = 0;

export const reducer = (state: any[] = [], action: any) => {
    switch (action.type) {
        case actions.ADD_BUG:
            return [
                ...state,
                {
                    id: ++lastId,
                    description: action.payload.description,
                    resolved: false
                }
            ];

        case actions.REMOVE_BUG:
            return state.filter(bug => bug.id !== action.payload.id);

        default:
            return state;
    }
}
