import * as statusTypes from '../types/api';

export const ApiReducer = (state = {}, action) => {
    switch (action.type) {
        case statusTypes.REQUEST:
            return {
                requestStart: true,
                loading: true,
            };
        case statusTypes.SUCCESS:
            return {
                requestSuccess: true,
                loading: false,
            };
        case statusTypes.FAILURE:
            return {
                requestFailure: true,
                loading: false,
            };
        case statusTypes.COMPLETED:
            return {
                requestCompleted: true,
                loading: false,
            }
        default:
            return state
    }
}

export default ApiReducer;
