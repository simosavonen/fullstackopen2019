import React from 'react'

const Person = ({ person }) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
        </tr>
    )
}

const Persons = (props) => {

    const rows = () => props.persons.map(person =>
        <Person 
        key={person.name}
        person={person}
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