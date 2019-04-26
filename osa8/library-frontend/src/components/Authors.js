import React, { useState } from 'react'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }
  if (props.result.loading) {
    return <div>loading...</div>
  }

  const submit = async (e) => {
    e.preventDefault()

    await props.editAuthor({
      variables: { name, born }
    })

    setBorn('')
  }

  const authors = props.result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.token &&
        <>
          <h3>Set birthyear</h3>
          <form onSubmit={submit}>
            <div>
              name
              <select value={name} onChange={({ target }) => setName(target.value)}>
                {authors.map(a =>
                  <option key={a.name} value={a.name}>{a.name}</option>
                )}
              </select>
            </div>
            <div>
              born
              <input
                value={born}
                onChange={({ target }) => setBorn(parseInt(target.value, 10))}
              />
            </div>
            <button type='submit'>update author</button>
          </form>
        </>
      }
    </div>
  )
}

export default Authors