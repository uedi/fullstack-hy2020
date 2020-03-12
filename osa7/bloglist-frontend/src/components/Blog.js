import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

const Blog = ({ blog }) => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()
    const history = useHistory()    
    const [comment, setComment] = useState('')

    if(!blog) {
        return null
    }

    const showRemoveButton = user && blog.user && user.username === blog.user.username
    
    const handleRemoveBlog = (id) => {
        blogService
            .remove(id)
            .then(response => {
                if(response.status === 204) {
                    history.push('/')
                    dispatch(removeBlog(id))
                    dispatch(setNotification('blog removed', 3))
                } else {
                    dispatch(setNotification(`Could not remove blog: ${response.statusText}`, 4, true))
                }
            })
            .catch(error => {
                console.log(error)
                dispatch(setNotification(`${error}`, 5, true))
            })
    }

    const handleRemove = () => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            handleRemoveBlog(blog.id)
        }
    }

    const handleLike = () => {
        const updatedBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user,
            comments: blog.comments ? blog.comments : []
        }
        blogService
            .update(blog.id, updatedBlog)
            .then(returnedBlog => {
                dispatch(updateBlog(returnedBlog))
            })
            .catch(error => {
                dispatch(setNotification('could not update blog', 4, true))
            })
    }

    const removeButton = () => (
        <div>
            <Button style={{ marginTop: 20 }} onClick={handleRemove} variant='contained' color='secondary'>remove</Button>
        </div>
    )

    const userInfo = () => {
        if(!blog.user || !blog.user.name) {
            return null
        }
        return (
            <p>added by {blog.user.name}</p>
        )
    }
    
    const handleComment = (event) => {
        event.preventDefault()
        if(comment) {
            blogService
                .addComment(blog.id, comment)
                .then(returnedBlog => {
                    dispatch(updateBlog(returnedBlog))
                    dispatch(setNotification('comment added'))
                    setComment('')
                })
                .catch(error => {
                    dispatch(setNotification('could not comment on blog', 4, true))
                })
        }
    }

    const blogComments = () => (
        <div>
            <ul>
                {blog.comments.map((comment, i) =>
                    <li key={i}>
                        <p>{comment}</p>
                    </li>
                )}
            </ul>
        </div>
    )

    return (
        <div>
            <h2>{blog.title} - {blog.author}</h2>
            <a href={blog.url}>{blog.url}</a>
            <p>{blog.likes} {blog.likes === 1 ? 'like' : 'likes'}</p>
            { blog.user && userInfo() }
            <Button onClick={handleLike} variant='contained' color='default'>like</Button>
            { showRemoveButton && removeButton() }
            <br />
            <h3>comments</h3>
            <form onSubmit={handleComment} >
                <div>
                    <TextField id='comment' name='comment' value={comment} onChange={({ target }) => setComment(target.value)}/>
                    <Button style={{ marginLeft: 10 }} id='comment-button' variant='contained' color='default' type='submit'>add comment</Button>
                </div>
                <div>
                    { blog.comments && blogComments() }
                </div>
            </form>
        </div>
    )
}

export default Blog