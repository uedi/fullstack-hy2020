const userId = '5e4ab9a2fcfb461b4d998fbd'

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        user: userId
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
        likes: 10,
        user: userId
    }
]

const newBlog = {
    title: 'Some title',
    author: 'Some dude',
    url: 'https://some.url.com/',
    likes: 0,
    user: userId
}

const testUser = {
    username: 'dude',
    password: 'password',
    name: 'Dude'
}

const testUserToDb = {
    _id: userId,
    username: 'dude',
    name: 'Dude',
    passwordHash: '$2b$10$L4Xn8kOy0HBdANO4KTUTqOrVnDcscMPlfjHabcJSXpQJowY67XxLK'
}

const sameBlogContent = (first, second) => {
    return first.author === second.author && first.title === second.title && first.url === second.url && first.likes === second.likes
}

const testUserAuth = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImR1ZGUiLCJpZCI6IjVlNGFiOWEyZmNmYjQ2MWI0ZDk5OGZiZCIsImlhdCI6MTU4MTk1ODUxNX0.RjQgEH5m3MwXw7PxS9WPyL06Jdki_fjYTn2gQkAr6r4'

module.exports = {
    initialBlogs, newBlog, testUser, testUserToDb, testUserAuth, sameBlogContent
}