import * as statusTypes from '../types/api';

export const apiActions = {
    request,
    success,
    failure,
    completed,
    showLoader,
    hideLoader
};

function request () {
    return {
        type: statusTypes.REQUEST
    }
}

function success () {
    return {
        type: statusTypes.SUCCESS
    }
}

function failure () {
    return {
        type: statusTypes.FAILURE
    }
}

function completed () {
    return {
        type: statusTypes.COMPLETED
    }
}

function showLoader () {
    return {
        type: 'SHOW_LOADER'
    }
}

function hideLoader () {
    return {
        type: 'HIDE_LOADER'
    }
}