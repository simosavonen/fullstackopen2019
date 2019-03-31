import React from 'react'

const Country = (props) => {
    const { country, showButtonHandler } = props
    return (
        <tr>
            <td>{country.name}</td>
            <td>
                <button onClick={() => showButtonHandler(country.name.toLowerCase())}>
                    show
                </button>
            </td>
        </tr>
    )
}

export default Country