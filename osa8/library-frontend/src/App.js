
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { ALL_AUTHORS, ALL_BOOKS, USER_INFO, BOOK_ADDED } from './queries'
import { useQuery, useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'

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
    const [token, setToken] = useState(null)
    const [getUserInfo, userInfoResult] = useLazyQuery(USER_INFO)
    const [genre, setGenre] = useState(null)
    const authorsResult = useQuery(ALL_AUTHORS)
    const booksResult = useQuery(ALL_BOOKS)
    const client = useApolloClient()

    useEffect(() => {
        const savedToken = localStorage.getItem('library-app-user-token')
        if(savedToken) {
            setToken(savedToken)
            getUserInfo()
        }
    }, []) // eslint-disable-line

    useEffect(() => {
        if(userInfoResult.data && userInfoResult.data.me) {
            setGenre(userInfoResult.data.me.favoriteGenre)
        }
    }, [userInfoResult.data])

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded
            updateCacheWith(addedBook)
            window.alert(`new book ${addedBook.title} by ${addedBook.author.name}`);
        }
    })

    const updateCacheWith = (addedBook) => {
        const includedIn = (set, object) => {
            set.map(b => b.title).includes(object.title)
        }
        const dataInStore = client.readQuery({ query: ALL_BOOKS })
        if(!includedIn(dataInStore.allBooks, addedBook)) {
            client.writeQuery({
                query: ALL_BOOKS,
                data: { allBooks : dataInStore.allBooks.concat(addedBook) }
            })
        }
    }

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 4000)
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
        if(page === 'add') {
            setPage('authors')
        }
    }

    const loginSuccessful = () => {
        setPage('authors')
        getUserInfo()
    }

    return (
        <div>
            <Notify errorMessage={errorMessage} />
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                { token && <button onClick={() => setPage('add')}>add book</button> }
                { token && <button onClick={() => setPage('recommend')}>recommend</button> }
                { token && <button onClick={() => logout()}>logout</button> }
                { !token && <button onClick={() => setPage('login')}>login</button> }
            </div>

            <Authors
                show={page === 'authors'}
                authors={ authorsResult.data ? authorsResult.data.allAuthors : null }
                setError={notify}
                token={token}
            />

            <Books
                show={page === 'books'}
                books={ booksResult.data ? booksResult.data.allBooks : null }
            />

            <NewBook
                show={page === 'add'}
                setError={notify}
            />

            <Recommend
                show={page === 'recommend'}
                books={ booksResult.data ? booksResult.data.allBooks : null }
                genre={genre}
            />

            <LoginForm
                show={page === 'login'}
                setError={notify}
                setToken={setToken}
                loginSuccessful={loginSuccessful}
            ></LoginForm>

        </div>
    )
}

export default App