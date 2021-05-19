import React, { useState } from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog, updateLikes, deleteBlog, user }) => {
    const [visible, setVisible] = useState(false)

    const handleVisibility = () => {
        setVisible(!visible)
    }

    const deleteButton = () => <button onClick={() => deleteBlog(blog)}>remove</button>

    const extraDetails = () => (
        <div className="blogInfo" style={blogStyle}>
            <p>
                {blog.title} {blog.author}
            </p>
            <p> {blog.url} </p>
            <p>
                likes: {blog.likes} <button onClick={() => updateLikes(blog)}>like</button>
            </p>
            <p> {blog.user.name} </p>
            {blog.user.username === user && deleteButton()}
        </div>
    )

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5,
    }

    return (
        <div>
            <div style={blogStyle} className="blog">
                {blog.title} {blog.author}
                <button className="show" onClick={handleVisibility}>
                    {visible ? 'hide' : 'show'}
                </button>
            </div>
            {visible && extraDetails()}
        </div>
    )
}

Blog.propTypes = {
    blog: propTypes.object.isRequired,
    updateLikes: propTypes.func.isRequired,
    deleteBlog: propTypes.func.isRequired,
    user: propTypes.string.isRequired,
}

export default Blog
