let timer

const notificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

export const setNotification = (message, seconds, isError = false) => {
    const notification = {
        message: message,
        isError: isError
    }
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: notification
        })
        clearTimeout(timer)
        timer = setTimeout(() => {
            dispatch(removeNotification())
        }, seconds * 1000)
    }
}

export const removeNotification = () => {
    return {
        type: 'SET_NOTIFICATION',
        data: null
    }
}

export default notificationReducer