const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        likes: 10,
    }
]

const newBlog = {
        title: 'Some title',
        author: 'Some dude',
        url: 'https://some.url.com/',
        likes: 0
    }

module.exports = {
    initialBlogs, newBlog
}