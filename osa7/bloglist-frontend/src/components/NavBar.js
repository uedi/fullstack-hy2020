import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    spacer: {
        flexGrow: 1
    },
    logoutButton: {
        marginLeft: 10
    }
});

const NavBar = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const localStorageLoggedUser = 'loggedBlogAppUser'
    const styles = useStyles()

    const handleLogout = () => {
        window.localStorage.removeItem(localStorageLoggedUser)
        dispatch(removeUser())
    }

    return (
        <AppBar position='static'>
            <Toolbar>
                <Button color='inherit' component={Link} to='/'>
                    blogs
                </Button>
                <Button color='inherit' component={Link} to='/users'>
                    users
                </Button>
                <div className={styles.spacer}>
                </div>
                <Typography>
                    {user.name} logged in
                </Typography>
                <Button color='inherit' onClick={handleLogout} className={styles.logoutButton}>
                    logout
                </Button>
            
            </Toolbar>
        </AppBar>
    )    
}

export default NavBar