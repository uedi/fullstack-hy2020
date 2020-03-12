import React, { useState, useImperativeHandle } from 'react'
import Button from '@material-ui/core/Button'

const Togglable = React.forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <Button style={{ marginTop: 20 }} className='togglableButton' onClick={toggleVisibility} variant='contained' color='default'>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button style={{ marginTop: 10 }} onClick={toggleVisibility} variant='contained' color='default'>cancel</Button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable