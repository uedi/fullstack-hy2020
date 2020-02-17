const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
})

describe('create user', () => {
    test('is not possible with invalid data', async () => {
        await api
            .post('/api/users')
            .send( { username: "dude", name: "dude" })
            .expect(400)

        await api
            .post('/api/users')
            .send( { pasword: "pasword1", name: "dude" })
            .expect(400)

        const tooShortUsernameResponse = await api
            .post('/api/users')
            .send( { username: "gg", password: "pasword1", name: "dude" })
            .expect(400)
        expect(tooShortUsernameResponse.body.error).toBeDefined()
        expect(tooShortUsernameResponse.body.error).toBe('username and password must be at least 3 characters')

        const tooShortPaswordResponse = await api
            .post('/api/users')
            .send( { username: "dude", password: "pw", name: "dude" })
            .expect(400)
        expect(tooShortPaswordResponse.body.error).toBeDefined()
        expect(tooShortPaswordResponse.body.error).toBe('username and password must be at least 3 characters')
    })
    test('creates new user when data is valid', async () => {
        const initialResponse = await api
            .get('/api/users')
            .expect(200)
        expect(initialResponse.body.length).toBe(0)
        
        const postResponse = await api
            .post('/api/users')
            .send(helper.testUser)
            .expect(200)
                
        expect(postResponse.body.id).toBeDefined()
        const expected = { username: helper.testUser.username, name: helper.testUser.name, blogs: [], id: postResponse.body.id }
        expect(postResponse.body).toEqual(expected)

        const getResponse = await api.get('/api/users').expect(200)
        expect(getResponse.body.length).toBe(1)
        expect(getResponse.body[0]).toEqual(expected)
        
    })
    test('requires unique username', async () => {
        await api
            .post('/api/users')
            .send(helper.testUser)
            .expect(200)
        await api
            .post('/api/users')
            .send(helper.testUser)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})

