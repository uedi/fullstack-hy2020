import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, username, updateBlog, removeBlog }) => {
    const [contentVisible, setContentVisible] = useState(false)
    const showWhenContentVisible = { display: contentVisible ? '' : 'none' }
    const showRemoveButton = username && blog.user && username === blog.user.username

    const toggleVisibility = () => {
        setContentVisible(!contentVisible)
    }

    const handleLike = () => {
        const newBlog = { ...blog, likes: blog.likes + 1 }
        updateBlog(newBlog)
    }

    const handleRemove = () => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            removeBlog(blog.id)
        }
    }

    const removeButton = () => (
        <button onClick={handleRemove}>remove</button>
    )

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div style={blogStyle}>
            <div className='blogContentTopic'>
                {blog.title} - {blog.author}
                <button className='button' onClick={toggleVisibility}>{contentVisible ? 'hide' : 'view'}</button>
            </div>
            <div style={showWhenContentVisible} className='blogContentToView'>
                <div className='blogUrl'>
                    {blog.url}
                </div>
                <div>
                    likes {blog.likes}
                    <button onClick={handleLike}>like</button>
                </div>
                { showRemoveButton && removeButton() }
            </div>
        </div>
    )
}

Blog.propTypes = {
    updateBlog: PropTypes.func.isRequired,
    removeBlog: PropTypes.func.isRequired
}

export default Blog