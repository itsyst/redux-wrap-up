import * as actions from './actionTypes';

export const addBug = (description: string) => ({
    type: actions.ADD_BUG,
    payload: {
        description: description
    }
})

export const removeBug = (id: number) => ({
    type: actions.REMOVE_BUG,
    payload: {
        id: id
    }
})

export const resolveBug = (id: number) => ({
    type: actions.RESOLVE_BUG,
    payload: {
        id: id,
    }
})
