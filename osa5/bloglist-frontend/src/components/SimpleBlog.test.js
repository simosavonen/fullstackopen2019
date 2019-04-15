import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  const blog = {
    title: 'the title',
    author: 'author name',
    likes: 100
  }

  const handleClick = () => {
    // ...
  }

  const component = render(
    <SimpleBlog blog={blog} onClick={handleClick} />
  )

  const titleDiv = component.container.querySelector('.blogTitle')
  expect(titleDiv).toHaveTextContent('the title author name')

  const likesDiv = component.container.querySelector('.blogLikes')
  expect(likesDiv).toHaveTextContent('blog has 100 likes')

})

test('clicking the like button twice calls event handler 2 times', async () => {
  const blog = {
    title: 'the title',
    author: 'author name',
    likes: 100
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})