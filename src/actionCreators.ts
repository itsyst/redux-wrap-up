import * as actions from './actionTypes';

export function addBug(description: string): any {
    return {
        type: actions.ADD_BUG,
        payload: {
            description: description
        }
    }
}

export function removeBug(id: number): any {
    return {
        type: actions.REMOVE_BUG,
        payload: {
            id: id
        }
    }
}
