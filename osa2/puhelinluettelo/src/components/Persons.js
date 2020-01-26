import React from 'react'
import Person from './Person'

const Persons = ({persons}) => (
    <ul>
        { persons.map(person =>
            <Person key={person.name} person={person} />
        )}
    </ul>
)

export default Persons