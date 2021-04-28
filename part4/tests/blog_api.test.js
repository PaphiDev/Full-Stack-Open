const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const { initialBlogs, blogsInDb, usersInDb } = require('./test_helper')

const api = supertest(app)

const getUserToken = async () => {
    const result = await api.post('/api/login').send({ username: 'root', password: 'password' })
    return result.body.token
}

beforeEach(async () => {
    await Blog.deleteMany({})

    const user = await usersInDb()

    const blogObjects = initialBlogs.map((blog) => new Blog({ ...blog, user: user[1].id }))
    const promiseArray = blogObjects.map((blog) => blog.save())
    await Promise.all(promiseArray)
})

describe('- Blogs return', () => {
    test('in the json format', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('unique identifier property as id', async () => {
        const response = await api.get('/api/blogs').expect(200)
        expect(response.body[0].id).toBeDefined()
    })

    test('a blog with a specific id', async () => {
        const blog = await api.get(`/api/blogs/${initialBlogs[0]._id}`).expect(200)
        expect(blog.body.title).toContain('React patterns')
    })
})

describe('- HTTP POST request', () => {
    test('successfully creates a new blog post entry', async () => {
        const token = await getUserToken()

        const newBlog = {
            title: 'Test Blog',
            author: 'Author Name Here',
            url: 'https://www.duckduckgo.com',
            likes: 3,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const contents = response.body.map((r) => r.title)

        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(contents).toContain('Test Blog')
    })

    test('defaults missing likes property to 0', async () => {
        const token = await getUserToken()

        const newBlog = {
            title: 'likes property missing',
            author: 'Author Name Here',
            url: 'https://www.duckduckgo.com',
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await Blog.find({ title: 'likes property missing' })
        expect(response[0]).toHaveProperty('likes', 0)
    })

    test('returns code 400 if title or url properties are missing', async () => {
        const token = await getUserToken()

        const newBlog = {
            author: 'author name',
            likes: 4,
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)
    })

    test('returns code 401 "unauthorized" if token is not provided', async () => {
        const newBlog = {
            title: 'likes property missing',
            author: 'Author Name Here',
            url: 'https://www.duckduckgo.com',
        }

        await api.post('/api/blogs').send(newBlog).expect(401)
    })
})

describe('- Changing the DB by', () => {
    test('deleting a blog returns code 204', async () => {
        const token = await getUserToken()
        const currentBlogs = await blogsInDb()

        await api
            .delete(`/api/blogs/${currentBlogs[0].id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const response = await blogsInDb()
        expect(response).toHaveLength(initialBlogs.length - 1)
    })

    test('updating a blog returns updated object', async () => {
        const currentBlogs = await blogsInDb()

        await api.put(`/api/blogs/${currentBlogs[0].id}`).send({ likes: 122 })
        const blog = await api.get(`/api/blogs/${currentBlogs[0].id}`)

        expect(blog.body.likes).toBe(122)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
