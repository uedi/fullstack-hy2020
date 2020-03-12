import React, { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs, createBlog } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { initUsers } from './reducers/usersReducer'
import BlogList from './components/BlogList'
import User from './components/User'
import Users from './components/Users'
import Blog from './components/Blog'
import NavBar from './components/NavBar'
import {
    Switch,
    Route,
    useRouteMatch
} from 'react-router-dom'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const localStorageLoggedUser = 'loggedBlogAppUser'
    const blogFormRef = React.createRef()
    
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blogs)

    const matchUserRoute = useRouteMatch('/users/:id')
    const matchedUser = matchUserRoute
        ? users.find(u => u.id === matchUserRoute.params.id)
        : null
    
    const matchBlogRoute = useRouteMatch('/blogs/:id')
    const matchedBlog = matchBlogRoute
        ? blogs.find(b => b.id === matchBlogRoute.params.id)
        : null

    useEffect(() => {
        blogService.getAll().then(blogs =>
            dispatch(initBlogs(blogs))
        )
    }, [dispatch])

    useEffect(() => {
        usersService.getAll().then(users => {
            dispatch(initUsers(users))
        })
    }, [dispatch])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem(localStorageLoggedUser)
        if(loggedUserJSON) {
            const loggedUser = JSON.parse(loggedUserJSON)
            dispatch(setUser(loggedUser))
            blogService.setToken(loggedUser.token)
        }
    }, [dispatch])

    const addBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                dispatch(createBlog(returnedBlog))
                dispatch(setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 3))
            })
            .catch(error => {
                dispatch(setNotification('could not create blog', 4, true))
            })
    }
    
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(localStorageLoggedUser, JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch(setUser(user))
            setUsername('')
            setPassword('')
        } catch(exception) {
            dispatch(setNotification('wrong username or password', 4, true))
        }
    }

    const loginForm = () => (
        <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
        />
    )

    const blogForm = () => (
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
        </Togglable>
    )

    return (
        <div>           
            {user === null ?
                <div>
                    <Notification />
                    {loginForm()}
                </div> :
                <div>
                    <NavBar />
                    <Notification />
                    <Switch>
                        <Route path='/blogs/:id'>
                            <Blog blog={matchedBlog} />
                        </Route>
                        <Route path='/users/:id'>
                            <User user={matchedUser}/>
                        </Route>
                        <Route path='/users'>
                            <Users />
                        </Route>
                        <Route path='/'>
                            {blogForm()}
                            <BlogList />
                        </Route>
                    </Switch>
                </div>
            }
        </div>
    )
}

export default App