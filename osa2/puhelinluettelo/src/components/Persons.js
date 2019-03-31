import React from 'react'

const Person = ({ person, deleteHandler }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td>
                <button onClick={() => deleteHandler(person)}>poista</button>
            </td>
        </tr>
    )
}

const Persons = (props) => {

    const rows = () => props.persons.map(person =>
        <Person 
        key={person.name}
        person={person}
        deleteHandler={props.deleteHandler}
        />  
    )

    return (
        <table>
            <tbody>
                {rows()}
            </tbody>
        </table>
    )
}

export default Persons