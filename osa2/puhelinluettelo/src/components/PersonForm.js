import React from 'react'

const PersonForm = (props) => {
    const { formAction, nameState, numberState, 
        nameHandler, numberHandler } = props
    return (
        <form onSubmit={formAction}>
            <div>
                nimi: 
                <input 
                value={nameState}
                onChange={nameHandler}
                />
            </div>
            <div>
                numero:
                <input 
                value={numberState}
                onChange={numberHandler}
                />
            </div>
            <div>
                <button type="submit">lisää</button>
            </div>
        </form>
    )
}

export default PersonForm