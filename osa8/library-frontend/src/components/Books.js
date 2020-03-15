import React, { useState } from 'react'

const Books = (props) => {
    const [filter, setFilter] = useState(null)

    if (!props.show || !props.books) {
        return null
    }

    const getButtonStyle = (button) => {
        if(button === filter) {
            return {backgroundColor: 'yellow'}
        } else {
            return null
        }
    }

    const booksToShow = filter
        ? props.books.filter(book => book.genres.includes(filter))
        : props.books
    
    return (
        <div>
            <h2>books</h2>
            { filter && <p>in genre <b>{filter}</b></p>}
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>
                        author
                    </th>
                    <th>
                        published
                    </th>
                </tr>
                {booksToShow.map(a =>
                    <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                    </tr>
                )}
                </tbody>
            </table>
            <div style={{ marginTop: 20 }}>
                <button style={getButtonStyle('refactoring')} onClick={() => setFilter('refactoring')}>refactoring</button>
                <button style={getButtonStyle('agile')} onClick={() => setFilter('agile')}>agile</button>
                <button style={getButtonStyle('patterns')} onClick={() => setFilter('patterns')}>patterns</button>
                <button style={getButtonStyle('design')} onClick={() => setFilter('design')}>design</button>
                <button style={getButtonStyle('crime')} onClick={() => setFilter('crime')}>crime</button>
                <button style={getButtonStyle('classic')} onClick={() => setFilter('classic')}>classic</button>
                <button style={getButtonStyle(null)} onClick={() => setFilter(null)}>all genres</button>
            </div>

        </div>
    )
}

export default Books