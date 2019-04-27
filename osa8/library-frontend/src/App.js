import React, { useState, useEffect } from 'react'
import { useQuery, useMutation, useApolloClient } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import { Subscription } from 'react-apollo'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const ALL_BOOKS = gql`
{
  allBooks {
    title
    published
    author {
      name
    }
    id
    genres
  }
}
`

const ALL_AUTHORS = gql`
{
  allAuthors {
    name
    born
    id
    authorOf {
      title
    }
  }
}
`

const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    published
    genres
    id
  }
}
`

const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(name: $name, born: $born) {
    name
    born
    id
  }
}
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

const ME = gql`
{
  me {
    username
    favoriteGenre
  }
}
`

const BOOK_ADDED = gql`
subscription {
  bookAdded {
    title
    published
    author {
      name
    }
    id
    genres
  }
}
`
const AUTHOR_ADDED = gql`
subscription {
  authorAdded {
    name
    born
    id    
  }
}
`

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(null)
  const [favorite, setFavorite] = useState('')

  const client = useApolloClient()

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token', token))
  }, [])

  const allBooks = useQuery(ALL_BOOKS)
  const allAuthors = useQuery(ALL_AUTHORS)

  const handleError = (error) => {
    console.log(error)
  }

  const includedIn = (set, object) =>
    set.map(p => p.id).includes(object.id)

  const addBook = useMutation(CREATE_BOOK, {
    onError: handleError,
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_BOOKS })
      const addedBook = response.data.addBook

      if (!includedIn(dataInStore.allBooks, addedBook)) {
        dataInStore.allBooks.push(addedBook)
        client.writeQuery({
          query: ALL_BOOKS,
          data: dataInStore
        })
      }
    },
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const editAuthor = useMutation(EDIT_AUTHOR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const login = useMutation(LOGIN)
  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('login')
    setFavorite(null)
  }

  const showRecommendations = async () => {
    const currentUser = await client.query({ query: ME })
    setFavorite(currentUser.data.me.favoriteGenre)
    setPage('books')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => {
          setFavorite(null)
          setPage('books')
        }}>books</button>
        {token &&
          <>
            <button onClick={() => showRecommendations()}>recommendations</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => logout()}>logout</button>
          </>
        }
        {!token &&
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
        result={allAuthors}
        editAuthor={editAuthor}
      />

      <Books
        show={page === 'books'}
        result={allBooks}
        client={client}
        favorite={favorite}
      />

      <NewBook
        show={page === 'add'}
        addBook={addBook}
      />

      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={(token) => setToken(token)}
        handleError={handleError}
      />

      <Subscription
        subscription={BOOK_ADDED}
        onSubscriptionData={({ subscriptionData }) => {
          const addedBook = subscriptionData.data.bookAdded
          window.alert(`${addedBook.title} added`)

          const dataInStore = client.readQuery({ query: ALL_BOOKS })
          if (!includedIn(dataInStore.allBooks, addedBook)) {
            dataInStore.allBooks.push(addedBook)
            client.writeQuery({
              query: ALL_BOOKS,
              data: dataInStore
            })
          }
        }}
      >
        {() => null}
      </Subscription>

      <Subscription
        subscription={AUTHOR_ADDED}
        onSubscriptionData={({ subscriptionData }) => {
          const addedAuthor = subscriptionData.data.authorAdded
          window.alert(`${addedAuthor.name} added`)

          const dataInStore = client.readQuery({ query: ALL_AUTHORS })
          if (!includedIn(dataInStore.allAuthors, addedAuthor)) {
            dataInStore.allAuthors.push(addedAuthor)
            client.writeQuery({
              query: ALL_AUTHORS,
              data: dataInStore
            })
          }
        }}
      >
        {() => null}
      </Subscription>

    </div>
  )

}

export default App
