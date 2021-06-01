import React from 'react'
import { connect } from 'react-redux'

import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const submitAnecdote = async (e) => {
        e.preventDefault()

        const content = e.target.anecdote.value
        e.target.anecdote.value = ''

        props.addAnecdote(content)
        props.setNotification(`Added: '${content}'`, 5)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={submitAnecdote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default connect(null, { addAnecdote, setNotification })(AnecdoteForm)
