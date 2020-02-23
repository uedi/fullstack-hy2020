import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrlChange = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        id='titleInput'
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    author:
                    <input
                        id='authorInput'
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    url:
                    <input
                        id='urlInput'
                        value={url}
                        onChange={handleUrlChange}
                    />
                </div>
                <button id='createBlog' type='submit'>create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm