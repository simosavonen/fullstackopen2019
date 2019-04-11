const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog attribute id is defined', async () => {
  const data = await api.get('/api/blogs')
  expect(data.body[0].id).toBeDefined()
})

test('number of returned blogs is 2', async () => {
  const data = await api.get('/api/blogs')
  expect(data.body.length).toBe(initialBlogs.length)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(blog => blog.title)

  expect(response.body.length).toBe(initialBlogs.length + 1)
  expect(titles).toContain('First class tests')
})

test('undefined likes will be set to 0', async () => {
  const unlikedBlog = {
    title: 'Nobody likes this blog',
    author: 'Unliked Author',
    url: 'http://who.cares.com',
  }

  const response = await api
    .post('/api/blogs')
    .send(unlikedBlog)

  expect(response.body.likes).toBe(0)
})

test('a blog with no title and url results in 400 Bad Request', async () => {
  const malformedBlog = {
    author: 'Blogless Barry',
    likes: 100
  }

  await api
    .post('/api/blogs')
    .send(malformedBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})