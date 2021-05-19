import React from 'react'
import propTypes from 'prop-types'

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    // styling
    const redError = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    const greenError = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return <div className="error" style={message.color === 'red' ? redError : greenError}>{message.msg}</div>
}

Notification.propTypes = {
    message: propTypes.object,
}

export default Notification
