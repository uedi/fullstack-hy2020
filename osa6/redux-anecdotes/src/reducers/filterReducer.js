const filterReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_FILTER':
            return action.filter
        default:
            return state
    }
}

export const setFilter = filter => {
    return {
        type: 'SET_FILTER',
        filter
    }
}

export const removeFilter = () => {
    return {
        type: 'SET_FILTER',
        filter: null
    }
}

export default filterReducer