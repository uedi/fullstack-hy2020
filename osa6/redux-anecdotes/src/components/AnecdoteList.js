import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const filter = useSelector(state => state.filter)
    const anecdotes = useSelector(state => state.anecdotes).sort((a, b) => b.votes - a.votes)
    const anecdotesToShow = filter ? anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase())) : anecdotes

    const handleVote = (anecdote) => {
        dispatch(vote(anecdote))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
    }

    const style = {
        marginBottom: 5
    }

    return (
        <div>
            {anecdotesToShow.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div style={style}>
                    has {anecdote.votes}
                    <button onClick={() => handleVote(anecdote)}>vote</button>
                </div>
                </div>
            )}    
        </div>
    )
}

export default AnecdoteList