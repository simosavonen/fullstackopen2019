const blogs = [
  {
    id: "fdfdfdfdf1212121212",
    title: "Title of the Blog",
    author: "Author Name",
    url: "www.blogurl.com",
    likes: 1,
    user: {
      id: 'abc123',
      username: "mrblogger",
      name: "Mister Blogger"
    }
  },
  {
    id: "ghghghghgh34343434",
    title: "A Different Blog",
    author: "Different Author",
    url: "www.differenturl.com",
    likes: 2,
    user: {
      id: 'ghj456',
      username: "someone",
      name: "Someone Else"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }