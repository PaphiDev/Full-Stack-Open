import React, { useState, useImperativeHandle } from 'react'
import propTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
    Togglable.displayName = 'Togglable'

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabels[0]}</button>
            </div>

            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>{props.buttonLabels[1]}</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabels: propTypes.array.isRequired,
}
export default Togglable
