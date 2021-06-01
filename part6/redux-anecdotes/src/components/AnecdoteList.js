import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => {
        if (!state.filter) {
            return state.anecdote
        }

        return state.anecdote.filter((anecdote) =>
            anecdote.content.toUpperCase().includes(state.filter.toUpperCase())
        )
    })

    const dispatch = useDispatch()

    const vote = (id, content) => {
        dispatch(addVote(id))
        dispatch(setNotification(`You voted '${content}'`, 5))
    }

    // sorts in descending order
    anecdotes.sort((a, b) => (a.votes < b.votes ? 1 : -1))

    return (
        <>
            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default AnecdoteList
