
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import { useQuery } from '@apollo/client'

const Notify = ({errorMessage}) => {
    if ( !errorMessage ) {
        return null
    }
    return (
        <div style={{color: 'red', marginTop: 10, marginBottom: 10}}>
            {errorMessage}
        </div>
    )
  }

const App = () => {
    const [page, setPage] = useState('authors')
    const [errorMessage, setErrorMessage] = useState(null)

    const authorsResult = useQuery(ALL_AUTHORS)
    const booksResult = useQuery(ALL_BOOKS)
    
    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 4000)
    }

    return (
        <div>
            <Notify errorMessage={errorMessage} />
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
            </div>

            <Authors
                show={page === 'authors'}
                authors={ authorsResult.data ? authorsResult.data.allAuthors : null }
                setError={notify}
            />

            <Books
                show={page === 'books'}
                books={ booksResult.data ? booksResult.data.allBooks : null }
            />

            <NewBook
                show={page === 'add'}
                setError={notify}
            />

        </div>
    )
}

export default App