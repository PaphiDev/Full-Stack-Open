import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let component
    const handleUpdate = jest.fn()

    const blogObject = {
        title: 'Test Title',
        author: 'AuthorName',
        url: 'https://www.test.com',
        likes: 0,
        user: {
            name: 'test',
            username: 'test',
            id: '123',
        },
    }

    beforeEach(() => {
        component = render(
            <Blog
                blog={blogObject}
                updateLikes={handleUpdate}
                user="string"
                deleteBlog={() => {}}
            />
        )
    })

    test('renders author and title', () => {
        const div = component.container.querySelector('.blog')

        expect(div).toHaveTextContent('Test Title')
        expect(div).toHaveTextContent('AuthorName')

        expect(div).not.toHaveTextContent('https://www.test.com')
        expect(div).not.toHaveTextContent(0)
    })

    test('renders url and number of likes when "show" button clicked', () => {
        const button = component.getByText('show')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent('https://www.test.com')
        expect(component.container).toHaveTextContent(0)
    })

    test('like button is called twice', () => {
        const button = component.getByText('show')
        fireEvent.click(button)

        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(handleUpdate.mock.calls).toHaveLength(2)
    })
})
