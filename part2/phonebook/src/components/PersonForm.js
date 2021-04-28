import React from 'react'

const PersonForm = ({ submitHandler, name, number, button }) => {
    return (
        <>
            <form onSubmit={submitHandler}>
                <div>
                    {name.text} <input value={name.value} onChange={name.eventHandler} />
                </div>
                <div>
                    {number.text} <input value={number.value} onChange={number.eventHandler} />
                </div>
                <div>
                    <button type="submit"> {button} </button>
                </div>
            </form>
        </>
    )
}

export default PersonForm
