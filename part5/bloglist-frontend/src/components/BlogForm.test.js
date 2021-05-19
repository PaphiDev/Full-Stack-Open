import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    test('blog form', () => {
        const blogHandle = jest.fn()
        const component = render(<BlogForm createBlog={blogHandle} />)

        const author = component.container.querySelector('#author')
        const title = component.container.querySelector('#title')
        const url = component.container.querySelector('#url')
        const form = component.container.querySelector('form')

        fireEvent.change(author, { target: { value: 'AuthorName' } })
        fireEvent.change(title, { target: { value: 'Title' } })
        fireEvent.change(url, { target: { value: 'https://www.test.com' } })

        fireEvent.submit(form)

        expect(blogHandle.mock.calls).toHaveLength(1)
        expect(blogHandle.mock.calls[0][0].title).toBe('Title')
        expect(blogHandle.mock.calls[0][0].author).toBe('AuthorName')
        expect(blogHandle.mock.calls[0][0].url).toBe('https://www.test.com')
        expect(Object.keys(blogHandle.mock.calls[0][0]).length).toBe(3)
    })
})
