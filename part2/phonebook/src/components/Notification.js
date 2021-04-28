import React from 'react'

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

    return <div style={message.color === 'red' ? redError : greenError}>{message.msg}</div>
}

export default Notification
