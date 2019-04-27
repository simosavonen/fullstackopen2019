import React, { useState } from 'react'
import { gql } from 'apollo-boost'

const BOOKS_BY_GENRE = gql`
query findBooksByGenre($genreFilter: String!) {
  allBooks(genre: $genreFilter) {
    title
    author {
      name
    }
    published
    id
  }
}
`

const Books = ({ show, result, client }) => {
  const [booksByGenre, setBooksByGenre] = useState(null)
  const [genreName, setGenreName] = useState('')

  if (!show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }

  const books = result.data.allBooks

  const GenreButtons = () => {
    const allGenres = [].concat(...books.map(b => b.genres)) // google
    const uniqueGenres = [...new Set(allGenres)].sort() // also google
    const styles = {
      marginRight: 3
    }
    return (
      <div>
        {uniqueGenres.map(genre =>
          <button
            key={genre}
            style={styles}
            onClick={() => showGenre(genre)}>
            {genre}
          </button>
        )}
        <button key={'all'} onClick={() => setBooksByGenre(null)}>show all</button>
      </div>
    )
  }

  const showGenre = async (genre) => {
    const { data } = await client.query({
      query: BOOKS_BY_GENRE,
      variables: { genreFilter: genre }
    })
    setBooksByGenre(data.allBooks)
    setGenreName(genre)
  }

  // repeating the render code, ran into issues when tried to
  // set the original books array and reusing the same render
  if (booksByGenre) {
    return (
      <div>
        <h2>books in genre: {genreName}</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {booksByGenre.map(b =>
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        <GenreButtons />
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <GenreButtons />
    </div>
  )
}

export default Books