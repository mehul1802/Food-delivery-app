import API from '../services/api';
import { apiActions } from './api-actions';

export const apiServices = {
    getRecords,
    getRecord,
    patchRecord,
    addRecord
};

/**
  *  To get an array of resource from API
  *  @param
  *      url - Target url
  *      queryParams - Query params for filters
  *      options{action: 'ACTION_NAME'} - Action to trigger when api request succeeds
  */
 function getRecords(url, queryParams = '', options = {}) {
    if (options.urlAction) {
        url += options.urlAction;
    }
    
    if (queryParams) {
        url += `?${queryParams}`;
    }
    
    return async dispatch => {
        try {
            // Trigger loader
            dispatch(apiActions.request());

            const response = await API.get(url);
            dispatch({ type: options.action, response: response.data.data });

            // Hide loader
            dispatch(apiActions.success());
            return Promise.resolve(response);
        } catch (e) {
            dispatch(apiActions.failure());
            return Promise.reject(e);
        }
    };
}

/**
  *  To get single resource from API
  *  @param
  *      url - Target url
  *      id - Target resource
  *      options - {} 
  *         action - Action to trigger when api request succeeds
  *         urlAction - Custom action to append in url
  */
function getRecord(url, id, options = {}) {
    let endPoint = `${url}/${id}`;

    if (options.urlAction) {
        endPoint += options.urlAction;
    }
    
    return async dispatch => {
        try {
            // Trigger loader
            dispatch(apiActions.request());

            const response = await API.get(endPoint);
            dispatch({ type: options.action, response: response.data.data });

            // Hide loader
            dispatch(apiActions.success());
            return Promise.resolve(response);
        } catch (e) {
            dispatch(apiActions.failure());
            return Promise.reject(e);
        }
    };
}

/**
  *  To update a specific key in a resource
  *  @param
  *      url - Target url
  *      payload - Payload to send in API
  *      id - Target resource id
  *      options - {}
  *          action - Action to trigger when api request succeeds
  *          urlAction - Custom action to append in url
  */
function patchRecord (url, id, payload= {}, options = {}) {
    let endPoint = `${url}/${id}`;

    if (options.urlAction) {
        endPoint += options.urlAction;
    }

    return async dispatch => {
        try {
            // Trigger Loader
            dispatch(apiActions.request());
            
            const response = await API.patch(endPoint, payload);

            dispatch({ type: options.action, response: response.data.data, payload: payload });

            return Promise.resolve(response);
        } catch (e) {
            dispatch(apiActions.failure());
            return Promise.reject(e);
        }
    };
}

/**
  *  To create a resource
  *  @param
  *      url - Target url
  *      param - Payload to send in API
  *      options - {}
  *          action - Action to trigger when api request succeeds
  */
function addRecord(url, param, options = {}) {
    return async dispatch => {
        try {
            // Trigger loader
            dispatch(apiActions.request());
            
            const response = await API.post(url, param);
            
            // Success callback
            dispatch({ type: options.action, response: response.data.data, payload: param });

            // Hide loader
            dispatch(apiActions.success());

            return Promise.resolve(response);
        } catch (e) {
            dispatch(apiActions.failure());
            return Promise.reject(e);
        }
    };
}