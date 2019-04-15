import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'the title',
    author: 'author name',
    url: 'www.theurl.com',
    likes: 100,
    user: {
      id: 'abc123',
      username: 'mrblogger',
      name: 'Mister Blogger'
    }
  }

  const user = {
    token: 'randomchars',
    id: 'abc123',
    username: 'mrblogger',
    name: 'Mister Blogger'
  }

  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={user}
        handleLike={mockHandler}
        handleRemove={mockHandler}
      />
    )
  })

  it('at start the blog details are not displayed', () => {
    const div = component.container.querySelector('.minimizable')
    expect(div).toHaveTextContent('the title author name')
    expect(div).not.toHaveTextContent('www.theurl.com')
    expect(div).not.toHaveTextContent('100 likes')
    expect(div).not.toHaveTextContent('added by Mister Blogger')
  })

  it('clicking the div reveals the blog details', async () => {
    const div = component.container.querySelector('.minimizable')
    fireEvent.click(div)
    expect(div).toHaveTextContent('www.theurl.com')
    expect(div).toHaveTextContent('100 likes')
    expect(div).toHaveTextContent('added by Mister Blogger')
  })
})