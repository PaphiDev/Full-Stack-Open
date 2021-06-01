const initialState = { message: '' }

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return { message: action.data.message }
        case 'CLEAR_NOTIFICATION':
            return { message: '' }
        default:
            return state
    }
}

let timeoutID

export const setNotification = (message, seconds) => {
    return async (dispatch) => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: { message },
        })

        clearTimeout(timeoutID)

        timeoutID = setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, seconds * 1000)
    }
}

export default notificationReducer
