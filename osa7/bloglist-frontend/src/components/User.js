import React from 'react'
import {
    List,
    ListItem,
    Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    list: {
        backgroundColor: theme.palette.background.paper
    },
    blogTitle: {
        color: theme.palette.primary.dark
    }
}));

const User = ({ user }) => {

    const styles = useStyles()

    if(!user) {
        return null
    }

    return (
        <div>
            <h1>{user.name}</h1>
            <h2>added blogs</h2>
            <List className={styles.list}>
                {user.blogs.map(blog => (
                    <ListItem key={blog.id}>
                        <Typography className={styles.blogTitle}>
                            {blog.title}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default User