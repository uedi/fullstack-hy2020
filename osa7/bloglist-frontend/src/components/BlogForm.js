import React, { useState } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

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
                    <TextField id='titleInput' label='title' value={title} onChange={handleTitleChange} />
                </div>
                <div>
                    <TextField id='authorInput' label='author' value={author} onChange={handleAuthorChange} /> 
                </div>
                <div>
                    <TextField id='urlInput' label='url' value={url} onChange={handleUrlChange} /> 
                </div>
                <div style={{ marginTop: 20 }}>
                    <Button id='createBlog' variant='contained' color='primary' type='submit'>create</Button>
                </div>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm