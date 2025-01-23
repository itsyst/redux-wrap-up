type MiddlewareAPI = {
    dispatch: (action: unknown) => unknown;
    getState: () => unknown;
};

const func = ({dispatch, getState}: MiddlewareAPI) => (next: (action: unknown) => unknown) => (action: unknown) => {
    if (typeof action === 'function')
        action(dispatch, getState)
    else
        next(action);
}
 
export default func;




 