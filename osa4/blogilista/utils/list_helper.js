const dummy = blogs => 1

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => sum + blog.likes
  return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const reducer = (fav, blog) => ((fav.likes > blog.likes) ? fav : blog)

  // paluuarvo sellaisenaan, mukaan tulee _id, url ja __v
  return blogs.reduce(reducer, 0)
}

const _ = require('lodash')

const mostBlogs = (blogs) => {
  const counted = _.countBy(blogs, 'author')

  // ei varmuutta missä järjestyksessä countBy palautti tulokset
  const sorted = _(counted)
    .toPairs() // palauttaa array[[author, 1], [author, 2], [author, 3]]
    .orderBy(1, 'desc') // järjestää alkiot indeksin 1 mukaan, laskevaan järj.
    .value() // executes the chain sequence to resolve unwrapped value

  const most = {
    author: sorted[0][0],
    blogs: sorted[0][1],
  }

  // console.log(counted)
  // console.log(sorted)
  // console.log(most)

  return most
}

const mostLikes = (blogs) => {
  const grouped = _(blogs)
    .groupBy('author')
    .map((blog, author) => ({
      author,
      likes: _.sumBy(blog, 'likes'),
    }))
    .orderBy('likes', 'desc')
    .value()

  // console.log(grouped)

  return grouped[0]
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
