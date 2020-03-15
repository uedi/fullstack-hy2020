import React, { useState } from 'react'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'

const Authors = (props) => {
    const [selected, setSelected] = useState('')
    const [born, setBorn] = useState('')

    const [updateAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
        onError: (error) => {
            props.setError(error.graphQLErrors[0].message)
        }
    })

    if (!props.show || !props.authors) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()
        
        const bornYear = Number(born)

        if(selected) {
            updateAuthor({ variables: { name: selected, born: bornYear } })
            setBorn('')
            setSelected('')
        } else {
            props.setError('no author selected')
        }
    }

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>
                            born
                        </th>
                        <th>
                            books
                        </th>
                    </tr>
                    {props.authors.map(a =>
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            { props.token && 
            <div>
                <h2>set birthyear</h2>
                <form onSubmit={submit}>
                    <div>
                        name
                        <select value={selected} onChange={({ target }) => setSelected(target.value)}>
                            {props.authors.map(a =>
                                <option key={a.name} value={a.name}>{a.name}</option>
                            )}
                        </select>
                    </div>
                    <div style={{ marginTop: 10 }}>
                        born
                        <input
                            type='number'
                            value={born}
                            onChange={({ target }) => setBorn(target.value)}
                        />
                    </div>
                    <button style={{ marginTop: 20 }} type='submit'>update author</button>
                </form>
            </div>}
        </div>
    )
}

export default Authors
