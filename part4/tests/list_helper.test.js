const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

describe('- Dummy Test', () => {
    test('dummy returns one', () => {
        const result = listHelper.dummy([])
        expect(result).toBe(1)
    })
})

describe('- Total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(testHelper.blog)
        expect(result).toBe(5)
    })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(testHelper.blogs)
        expect(result).toBe(36)
    })
})

describe('- Favorite blog', () => {
    test('of an empty list', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toBe(0)
    })

    test('when list has only one blog, equals the object of that blog', () => {
        obj = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }

        const result = listHelper.favoriteBlog(testHelper.blog)
        expect(result).toEqual(obj)
    })

    test('of a bigger list is returned correctly', () => {
        obj = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12,
        }

        const result = listHelper.favoriteBlog(testHelper.blogs)
        expect(result).toEqual(obj)
    })
})

describe('- Most blogs', () => {
    test('of an empty list', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toBe(0)
    })

    test('of a list containing one object is returned correctly', () => {
        obj = {
            author: 'Edsger W. Dijkstra',
            blogs: 1,
        }

        const result = listHelper.mostBlogs(testHelper.blog)
        expect(result).toEqual(obj)
    })

    test('of a bigger list is returned correctly', () => {
        obj = {
            author: 'Robert C. Martin',
            blogs: 3,
        }

        const result = listHelper.mostBlogs(testHelper.blogs)
        expect(result).toEqual(obj)
    })
})

describe('- Most likes', () => {
    test('of an empty list', () => {
        const result = listHelper.mostLikes([])
        expect(result).toBe(0)
    })

    test('of a list containing one object is returned correctly', () => {
        obj = {
            author: 'Edsger W. Dijkstra',
            likes: 5,
        }

        const result = listHelper.mostLikes(testHelper.blog)
        expect(result).toEqual(obj)
    })

    test('of a bigger list is returned correctly', () => {
        obj = {
            author: 'Edsger W. Dijkstra',
            likes: 17,
        }

        const result = listHelper.mostLikes(testHelper.blogs)
        expect(result).toEqual(obj)
    })
})
