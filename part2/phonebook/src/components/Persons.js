import React from 'react'

const Persons = ({ person, deleteHandler }) => {
    return (
        <>
            {person.map((p) => (
                <div key={p.name}>
                    <p>
                        {p.name} {p.number}
                        <button onClick={() => deleteHandler(p.id, p.name)}>delete</button>
                    </p>
                </div>
            ))}
        </>
    )
}

export default Persons
