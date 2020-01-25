import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import "./index.css"

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)

const StatisticLine = (props) => (
    <tr>
        <td>{props.text}</td>
        <td>{props.value} {props.unit}</td>
    </tr>
)

const Statistics = ({good, neutral, bad}) => {
    const count = good + neutral + bad
    const average = count === 0 ? 0 : (1 * good + -1 * bad) / count
    const positives = count  === 0 ? 0 : 100 * good / count

    if(count === 0) {
        return (
            <div className="Statistics">
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div className="Statistics">
            <table>
                <tbody>
                    <StatisticLine text="good" value={good} />
                    <StatisticLine text="neutral" value={neutral} />
                    <StatisticLine text="bad" value={bad} />
                    <StatisticLine text="count" value={count} />
                    <StatisticLine text="average" value={average} />
                    <StatisticLine text="positive" value={positives} unit="%" />
                </tbody>
            </table>
        </div>
    )
}

const App = () => {

    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGoodClick = () => {
        setGood(good + 1)
    }

    const handleNeutralClick = () => {
        setNeutral(neutral + 1)
    }

    const handleBadClick = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={handleGoodClick} text="good" />
            <Button onClick={handleNeutralClick} text="neutral" />
            <Button onClick={handleBadClick} text="neutral" />
            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
        </div>
    )
}

ReactDOM.render(<App />, 
    document.getElementById('root')
)