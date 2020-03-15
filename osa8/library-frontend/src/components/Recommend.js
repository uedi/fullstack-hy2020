import React from 'react'

const Recommend = (props) => {
    const filter = 'crime'

    if (!props.show || !props.books) {
        return null
    }
    
    const booksToShow = props.books.filter(book => book.genres.includes(filter))
    
    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <b>{props.genre}</b></p>

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
            

        </div>
    )
}

export default Recommend