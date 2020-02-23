import React from 'react'

const Notification = ({ message, isError }) => {
    if(message === null) {
        return null
    }
    if(isError) {
        return (
            <div className='notification error'>
                {message}
            </div>
        )
    }
    return (
        <div className='notification message'>
            {message}
        </div>
    )
}

export default Notification