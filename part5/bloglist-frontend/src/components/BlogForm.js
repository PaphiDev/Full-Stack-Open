import React, { useState } from 'react'
import propTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({ title, author, url })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create a new blog</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        id="title"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>

                <div>
                    author:
                    <input
                        type="text"
                        id="author"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>

                <div>
                    url:
                    <input
                        type="url"
                        id="url"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>

                <button type="submit" id="createButton">
                    create
                </button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: propTypes.func.isRequired,
}

export default BlogForm
