const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../app')
const User = require('../models/user')
const { usersInDb } = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'root', name: 'root root', passwordHash })

    await user.save()
})

describe('- Dummy user', () => {
    test('successfully created', async () => {
        const usersAtStart = await usersInDb()

        expect(usersAtStart).toHaveLength(1)
    })
})

describe('- When there is initially one user in db', () => {
    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Lukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map((u) => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails if username is less than 3 characters long', async () => {
        const newUser = {
            username: 'te',
            name: 'test name',
            password: '123',
        }

        await api.post('/api/users').send(newUser).expect(400)
    })

    test('creation fails if password is less than 3 characters long', async () => {
        const newUser = {
            username: 'test',
            name: 'test name',
            password: '12',
        }

        await api.post('/api/users').send(newUser).expect(400)
    })

    test('creation fails if username is not unique', async () => {
        const newUser = {
            username: 'root',
            name: 'test name',
            password: '123',
        }

        await api.post('/api/users').send(newUser).expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})
