import anecdoteService from '../services/anecdotes'

const asObject = (anecdote) => {
    return {
        content: anecdote,
        votes: 0
    }
}

const reducer = (state = [], action) => {
    switch(action.type) {
        case 'UPDATE':
            const id = action.data.id
            return state.map(anecdote => anecdote.id !== id ? anecdote : action.data)
        case 'NEW_ANECDOTE':
            return [...state, action.data]
        case 'INIT_ANECDOTES':
            return action.data
        default:
            return state
    }
}

export const vote = (anecdote) => {
    return async dispatch => {
        const anecdoteToUpdate = {
            content: anecdote.content,
            votes: anecdote.votes + 1
        }
        const updatedAnecdote = await anecdoteService.update(anecdote.id, anecdoteToUpdate)
        dispatch({
            type: 'UPDATE',
            data: updatedAnecdote
        })       
    }
}

export const createAnecdote = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(asObject(content))
        dispatch({
            type: 'NEW_ANECDOTE',
            data: newAnecdote
        })
    }
}

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes
        })
    }
}

export default reducer