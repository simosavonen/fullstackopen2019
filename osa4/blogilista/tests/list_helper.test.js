const listHelper = require('../utils/list_helper')
const blogs = require('./test_data')

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('sum up the total likes of all blogs', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })
})

describe('favourite blog', () => {
  test('in the test data, favourite blog should be Dijkstras', () => {
    const result = listHelper.favouriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })
})

describe('most blogs', () => {
  test('who has the most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    const expected = { author: 'Robert C. Martin', blogs: 3 }
    expect(result).toEqual(expected)
  })

  test('who has the most likes', () => {
    const result = listHelper.mostLikes(blogs)
    const expected = { author: 'Edsger W. Dijkstra', likes: 17 }
    expect(result).toEqual(expected)
  })
})
