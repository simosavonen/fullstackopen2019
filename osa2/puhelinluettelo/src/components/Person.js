import React from 'react'

const Person = ({ person }) => {
    return (
        <tr>
            <td>{person.name}</td>
        </tr>
    )
}

export default Person