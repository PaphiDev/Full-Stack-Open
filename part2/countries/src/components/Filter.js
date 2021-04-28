import React from 'react'

const Filter = ({ text, value, eventHandler }) => {
    return (
        <>
            {text} <input value={value} onChange={eventHandler} />
        </>
    )
}

export default Filter