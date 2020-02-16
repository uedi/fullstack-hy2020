const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

describe('GET /api/blogs', () => {
    test('returns blogs as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('returns all blogs saved to db', async () => {
        const response = await api.get('/api/blogs').expect(200)
        const titles = response.body.map(blog => blog.title)
        expect(response.body.length).toBe(helper.initialBlogs.length)
        helper.initialBlogs.forEach(blog => {
            expect(titles).toContain(blog.title)
        })
    })
    test('bloglist is empty if no blogs saved to db', async () => {
        await Blog.deleteMany({})
        const response = await api.get('/api/blogs').expect(200)
        expect(response.body.length).toBe(0)
    })
    test('returned blogs have field id instead of _id', async () => {
        const response = await api.get('/api/blogs').expect(200)
        expect(response.body.length).toBeGreaterThan(0)
        const blog = response.body[0]
        expect(blog.id).toBeDefined()
        expect(blog._id).toBe(undefined)
    })
})

describe('POST /api/blogs', () => {
    test('a blog can be added to database', async () => {
        const initialResponse = await api.get('/api/blogs').expect(200)
        
        const postResponse = await api
            .post('/api/blogs')
            .send(helper.newBlog)
            .expect(201)

        const response = await api.get('/api/blogs').expect(200)
        expect(response.body.length).toBe(initialResponse.body.length + 1)
        const titles = response.body.map(blog => blog.title)
        expect(titles).toContain(helper.newBlog.title)
    })
    test('post returns new blog in correct format', async () => {
        const postResponse = await api
            .post('/api/blogs')
            .send(helper.newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const addedBlog = postResponse.body
        expect(addedBlog.title).toBe(helper.newBlog.title)
        expect(addedBlog.author).toBe(helper.newBlog.author)
        expect(addedBlog.url).toBe(helper.newBlog.url)
        expect(addedBlog.likes).toBe(helper.newBlog.likes)
        expect(addedBlog.id).toBeDefined
    })
    test('default value for likes is 0', async () => {
        const blog = { title: 'Title', author: 'Dude', url: 'https://url.com/' }
        const response = await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
        expect(response.body.likes).toBeDefined()
        expect(response.body.likes).toBe(0)
    })
    test('returns 400 Bad request if no title or url', async () => {
        const initialResponse = await api.get('/api/blogs').expect(200)
        const blogWithoutTitle = { author: 'Dude', url: 'https://url.com/' }
        const blogWithoutUrl = { title: 'Title', author: 'Dude' }

        await api
            .post('/api/blogs')
            .send(blogWithoutTitle)
            .expect(400)
        await api
            .post('/api/blogs')
            .send(blogWithoutUrl)
            .expect(400)

        const finalResponse = await api.get('/api/blogs').expect(200)
        expect(initialResponse.body.length).toBe(finalResponse.body.length)
    })
})

describe('DELETE /api/blogs/:id', () => {
    test('a blog can be removed', async () => {
        await Blog.deleteMany({})
        await Blog.insertMany([
            { title: 'Title1', author: 'Dude1', url: 'https://url1.com/' },
            { title: 'Title2', author: 'Dude2', url: 'https://url2.com/' }    
        ])

        const initialResponse = await api.get('/api/blogs').expect(200)
        expect(initialResponse.body.length).toBe(2)
        
        await api
            .delete(`/api/blogs/${initialResponse.body[0].id}`)
            .expect(204)

        const response = await api.get('/api/blogs').expect(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0].id).toBe(initialResponse.body[1].id)
    })
    test('returns 400 when id is not valid', async () => {
        await api
            .delete(`/api/blogs/abcd1234`)
            .expect(400)
    })
})

describe('PUT /api/blogs/:id', () => {
    test('a blog can be updated', async () => {
        const postResponse = await api
            .post('/api/blogs')
            .send(helper.newBlog)
            .expect(201)

        let newBlog = helper.newBlog
        newBlog.likes = newBlog.likes + 10
        
        const putResponse = await api
            .put(`/api/blogs/${postResponse.body.id}`)
            .send(newBlog)
            .expect(200)
        expect(putResponse.body.likes).toBe(newBlog.likes)

        const getResponse = await api
            .get(`/api/blogs/${postResponse.body.id}`)
            .expect(200)
        newBlog.id = postResponse.body.id
        expect(getResponse.body).toEqual(newBlog)
    })
})

describe('GET /api/blogs/:id', () => {
    test('returns a blog if it is saved to db', async () => {
        const initialResponse = await api
            .get('/api/blogs')
            .expect(200)
        expect(initialResponse.body.length).toBeGreaterThan(0)

        const response = await api
            .get(`/api/blogs/${initialResponse.body[0].id}`)
            .expect(200)

        expect(initialResponse.body[0]).toEqual(response.body)

        await api
            .delete(`/api/blogs/${initialResponse.body[0].id}`)
            .expect(204)
        
        await api
            .get(`/api/blogs/${initialResponse.body[0].id}`)
            .expect(404)
    })
    test('returns 400 when id is not valid', async () => {
        await api
            .get(`/api/blogs/abcd1234`)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})

