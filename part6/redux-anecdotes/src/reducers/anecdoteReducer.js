import anecdoteService from '../services/anecdoteService'

const anecdoteReducer = (state = [], action) => {
    // console.log('state now: ', state)
    // console.log('action', action)

    switch (action.type) {
        case 'INCREMENT_VOTE': {
            const updatedAnecdote = action.data.updatedAnecdote

            return state.map((anecdote) =>
                anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
            )
        }
        case 'ADD_ANECDOTE':
            return [...state, { ...action.data, votes: 0 }]
        case 'INIT_ANECDOTES':
            return action.data
        default:
            return state
    }
}

export const addVote = (id) => {
    return async (dispatch) => {
        const updatedAnecdote = await anecdoteService.updateVotes(id)

        dispatch({
            type: 'INCREMENT_VOTE',
            data: { updatedAnecdote },
        })
    }
}

export const addAnecdote = (content) => {
    return async (dispatch) => {
        const newAnecdote = await anecdoteService.createNew(content)

        dispatch({
            type: 'ADD_ANECDOTE',
            data: newAnecdote,
        })
    }
}

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteService.getAll()
        
        dispatch({
            type: 'INIT_ANECDOTES',
            data: anecdotes,
        })
    }
}

export default anecdoteReducer
