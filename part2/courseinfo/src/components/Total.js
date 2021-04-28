import React from 'react'

const Total = ({ parts }) => {
    const result = parts.reduce((num, parts) => {
        return num + parts.exercises
    }, 0)

    return (
        <>
            <p>
                <b> Total of {result} exercises </b>
            </p>
        </>
    )
}

export default Total
