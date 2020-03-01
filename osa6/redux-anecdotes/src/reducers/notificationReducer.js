let timer

const notificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export const setNotification = (notification, seconds) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            notification
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
        notification: null
    }
}

export default notificationReducer