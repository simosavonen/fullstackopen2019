import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('log in to application')
    )

    expect(component.container).toHaveTextContent('log in to application')

    expect(component.container).not.toHaveTextContent('Title of the Blog Author Name')

  })

  it('when logged in, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '123123123123',
      name: 'Tessa Testaaja'
    }

    localStorage.setItem('loggedBlogsUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('blogs')
    )

    expect(component.container).toHaveTextContent('Tessa Testaaja logged in')

    expect(component.container).toHaveTextContent('Title of the Blog Author Name')
    expect(component.container).toHaveTextContent('A Different Blog Different Author')

  })
})