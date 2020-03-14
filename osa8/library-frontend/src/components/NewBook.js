import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [published, setPublished] = useState('')
    const [genre, setGenre] = useState('')
    const [genres, setGenres] = useState([])

    const [createBook] = useMutation(CREATE_BOOK, {
        refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
        onError: (error) => {
            props.setError(error.graphQLErrors[0].message)
        }
    })

    if (!props.show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()
        
        const publishedYear = Number(published)

        createBook({ variables: {title, author, published: publishedYear, genres } })

        setTitle('')
        setPublished('')
        setAuthor('')
        setGenres([])
        setGenre('')
    }

    const addGenre = () => {
        setGenres(genres.concat(genre))
        setGenre('')
    }

    const hajurako = { marginTop: 20 }

    return (
        <div>
            <form onSubmit={submit}>
                <div style={hajurako}>
                    title
                    <input
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    published
                    <input
                        type='number'
                        value={published}
                        onChange={({ target }) => setPublished(target.value)}
                    />
                </div>
                <div style={hajurako}>
                    genres: {genres.join(' ')}
                </div>
                <div style={hajurako}>
                    <input
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <button onClick={addGenre} type="button">add genre</button>
                </div>

                <button style={hajurako} type='submit'>create book</button>
            </form>
        </div>
    )
}

export default NewBook