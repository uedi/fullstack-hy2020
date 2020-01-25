import React from 'react'

const Header = ({course}) => (
    <h2>{course}</h2>
)

const Part = ({part, exercises}) => (
    <p>{part} {exercises}</p>
)

const Content = ({parts}) => (
    <div>
        {parts.map((part, i) =>
            <Part key={i} part={part.name} exercises={part.exercises} />
        )}
    </div>
)

const ExerciseCount = ({parts}) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    
    return (
        <p><b>total of {total} exercises</b></p>
    )
}

const Course = ({course}) => (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <ExerciseCount parts={course.parts}/>
    </div>
)

export default Course