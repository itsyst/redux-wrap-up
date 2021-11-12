let lastId = 0;

export default function reducer(state: any[] = [], action: any) {
    switch (action.type) {
        case 'ADD_BUG':
            return [
                ...state,
                {
                    id: ++lastId,
                    description: action.payload.description,
                    resolved: false
                }
            ];

        case 'REMOVE_BUG':
            return state.filter(bug => bug.id !== action.payload.id);

        default:
            return state;
    }
}