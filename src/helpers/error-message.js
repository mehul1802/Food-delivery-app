import _ from 'lodash';

export function showError (ref = '', error = '') {
    let msg =  error.message || 'Oops, something went wrong';

    if (error.response && error.response.data && _.isObject(error.response.data) && (error.response.data.message || _.isObject(error.response.data.error))) {
        msg = error.response.data.message || error.response.data.error.message || msg;
    }

    if (!_.isEmpty(ref) && !_.isEmpty(msg)) {
        ref.addNotification({
            message: msg,
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: { duration: 2000 },
            dismissable: { click: true }
        });
    }
}

export function showFieldErrors(errors, fieldName) {
    const fieldError = errors[fieldName]
    return fieldError ? fieldError : ''
}