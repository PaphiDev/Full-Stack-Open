const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.length === 0 ? 0 : blogs.map((blog) => blog.likes).reduce((a, b) => a + b)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    const newBlogsArray = blogs
        .map(({ title, author, likes }) => ({ title, author, likes }))
        .sort((a, b) => a.likes - b.likes)
        .reverse()

    return newBlogsArray[0]
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    const countedAuthors = _.countBy(blogs.map((blog) => blog.author))

    let array = []

    Object.entries(countedAuthors).forEach((entry) => {
        const [key, value] = entry
        array.push({ author: key, blogs: value })
    })
    array.reverse()

    return array[0]
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }

    const groupedByAuthors = _.groupBy(blogs, function (blog) {
        return blog.author
    })
    const mappedLikesToAuthors = _.mapValues(groupedByAuthors, totalLikes)
    const mostLikedAuthor = Object.entries(mappedLikesToAuthors).reduce((a, b) =>
        a[1] > b[1] ? a : b
    )

    return { author: mostLikedAuthor[0], likes: mostLikedAuthor[1] }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }
