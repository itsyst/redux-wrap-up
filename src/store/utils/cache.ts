import { Dispatch } from 'redux';
import moment from 'moment';

interface State {
    entities: {
        [key: string]: {
            lastFetch?: number | null;
        };
    };
}

export const cachedAPIRequest = <T extends keyof State['entities']>(
    entityKey: T,
    cacheMinutes: number,
    dispatch: Dispatch,
    getState: () => State,
    apiCall: (dispatch: Dispatch) => void
) => {
    const state = getState();
    const { lastFetch } = state.entities[entityKey] || {};

    if (!lastFetch || moment().diff(moment(lastFetch), 'minutes') >= cacheMinutes) {
        apiCall(dispatch);
    }
};