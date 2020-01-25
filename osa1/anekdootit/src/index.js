import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import "./index.css"

const Button = ({onClick, text}) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const AnecdoteWithVotes = ({anecdote, votes}) => (
    <div>
        <p>{anecdote}</p>
        <p className="votes">has {votes} vote{votes === 1 ? "" : "s" }</p>
    </div>
)

const MostVotes = ({votes}) => {

    let mostPopular = 0

    for(let i = 0; i < votes.length; i++) {
        if(votes[i] > votes[mostPopular]) {
            mostPopular = i;
        }
    }

    if(votes[mostPopular] === 0) {
        return (
            <p>no votes yet</p>
        )
    }

    return (
        <AnecdoteWithVotes anecdote={anecdotes[mostPopular]} votes={votes[mostPopular]}/>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

    const handleNextClick = () => {
        const random = Math.floor(Math.random() * anecdotes.length)
        setSelected(random)
    }

    const handleVoteClick = () => {
        const newVotes = [...votes]
        newVotes[selected] += 1
        setVotes(newVotes)        
    }

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <AnecdoteWithVotes anecdote={props.anecdotes[selected]} votes={votes[selected]}/>
            <div>
                <Button onClick={handleVoteClick} text='vote' />
                <Button onClick={handleNextClick} text='next anecdote' />
            </div>
            <h1>Anecdote with most votes</h1>
            <MostVotes votes={votes}/>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)