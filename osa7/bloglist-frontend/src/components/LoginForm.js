import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password
}) => {
    const hajurako = { marginTop: 20 }
    return (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleSubmit} >
                <div>
                    <TextField id='username' label='username' value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <TextField id='password' type='password' label='password' value={password} onChange={handlePasswordChange} />
                </div>
                <div style={hajurako}>
                    <Button id='login-button' variant='contained' color='primary' type='submit'>login</Button>
                </div>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm