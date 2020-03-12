import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

const Notification = () => {
    const notification = useSelector(state => state.notification)

    if(notification === null) {
        return null
    }
    
    if(notification.isError) {
        return (
            <Alert severity='error'>{notification.message}</Alert>
        )
    }
    return (
        <Alert severity='success'>{notification.message}</Alert>
    )
}

export default Notification