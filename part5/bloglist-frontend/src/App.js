import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [reloadBlogs, setReloadBlogs] = useState(false)
    const blogFromRef = useRef()

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [reloadBlogs])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')

        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const reloadHandler = () => {
        setReloadBlogs(!reloadBlogs)
    }

    const resetErrorMessage = () => {
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    // user handlers
    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username)

        try {
            const user = await loginService.login({ username, password })

            window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))

            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            console.log('wrong credentials')
            console.log(exception)
            setErrorMessage({ msg: 'Wrong password or username', color: 'red' })

            resetErrorMessage()
        }
    }

    const logout = () => {
        window.localStorage.removeItem('loggedBlogUser')
        setUser(null)
        console.log('logged out')
    }

    // blog handlers
    const addBlog = async (blogObject) => {
        console.log('attempting to add blog')

        try {
            blogFromRef.current.toggleVisibility()
            const response = await blogService.create(blogObject)
            setBlogs(blogs.concat(response))

            console.log('blog added')
            setErrorMessage({
                msg: `a new blog '${blogObject.title}' by '${blogObject.author}' added`,
                color: 'green',
            })

            resetErrorMessage()
        } catch (exception) {
            console.log('failed adding blog')
            console.log(exception)
            setErrorMessage({ msg: exception.response.data.error, color: 'red' })

            resetErrorMessage()
        }
    }

    const updateLikes = async (blogObject) => {
        try {
            const newBlogObject = { ...blogObject, likes: blogObject.likes + 1 }
            const response = await blogService.update(blogObject.id, newBlogObject)

            const tmp = blogs.map((blog) => (blog.id === response.id ? response : blog))
            setBlogs(tmp)

            setErrorMessage({
                msg: `Increased the like count of ${blogObject.title} by ${blogObject.author}`,
                color: 'green',
            })

            resetErrorMessage()
        } catch (exception) {
            console.log('failed updating blog')
            console.log(exception)
            setErrorMessage({ msg: exception.response.data.error, color: 'red' })

            resetErrorMessage()
        }
    }

    const deleteBlog = async (blogObject) => {
        if (window.confirm(`Remove blog: ${blogObject.title} by ${blogObject.author}?`)) {
            await blogService.remove(blogObject.id)
            reloadHandler()
            setErrorMessage({
                msg: 'Blog successfully removed',
                color: 'green',
            })
            resetErrorMessage()
        }
    }

    // forms
    const blogForm = () => (
        <Togglable buttonLabels={['new blog', 'cancel']} ref={blogFromRef}>
            <BlogForm createBlog={addBlog} />
        </Togglable>
    )

    const loginForm = () => (
        <Togglable buttonLabels={['login', 'cancel']}>
            <LoginForm
                handleSubmit={handleLogin}
                handleUsernameChange={setUsername}
                handlePasswordChange={setPassword}
                password={password}
                username={username}
            />
        </Togglable>
    )

    return (
        <div>
            {user === null ? (
                <div>
                    <h2>Log in to application</h2>
                    <Notification message={errorMessage} />
                    {loginForm()}
                </div>
            ) : (
                <div>
                    <h2>Blogs</h2>
                    <Notification message={errorMessage} />
                    <p>
                        {user.name} logged in <button onClick={logout}>logout</button>
                    </p>
                    {/* <BlogForm createBlog={addBlog} /> */}
                    {blogForm()}
                    {blogs.sort((a, b) => (a.likes < b.likes ? 1 : -1)) &&
                        blogs.map((blog) => (
                            <Blog
                                key={blog.id}
                                blog={blog}
                                updateLikes={updateLikes}
                                deleteBlog={deleteBlog}
                                user={user.username}
                            />
                        ))}
                </div>
            )}
        </div>
    )
}

export default App
