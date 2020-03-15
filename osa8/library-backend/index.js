const { ApolloServer, UserInputError, AuthenticationError, gql, PubSub } = require('apollo-server')
const config = require('./util/config')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const jwt = require('jsonwebtoken')
const User = require('./models/user')

const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })

const typeDefs = gql`
    type Book {
        title: String!
        author: Author!
        published: Int!
        genres: [String!]!
        id: ID!
    }

    type Author {
        name: String!
        born: Int
        bookCount: Int!
        id: ID!
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [Author!]!
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }

    type Subscription {
        bookAdded: Book!
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let books = await Book.find({}).populate('author', { name: 1 })
            if(args.author) {
                const author = await Author.findOne({ name: args.author })
                books = author ? books.filter(book => book.author._id.toString() === author._id.toString()) : []
            }
            if(args.genre) {
                books = books.filter(book => book.genres.includes(args.genre))
            }
            return books
        },
        allAuthors: () => Author.find({}),
        me: (root, args, context) => {
            return context.currentUser
        }
    },
    Author: {
        bookCount: async (root) => {
            const books = await Book.find({ author: root._id })
            return books.length
        }
    },
    Mutation: {
        addBook: async (root, args, context) => {
            if(!context.currentUser) {
                throw new AuthenticationError("authentication required")
            }
            let author = await Author.findOne({ name: args.author })
            if(!author) {
                author = new Author({
                    name: args.author
                })
                try {
                    author = await author.save()
                } catch(error) {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                }
            }
            const newBook = new Book({
                title: args.title,
                author: author._id,
                published: args.published,
                genres: args.genres
            })
            try {
                await newBook.save()
            } catch(error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }

            newBook.author = author
            pubsub.publish('BOOK_ADDED', { bookAdded: newBook })

            return newBook
        },
        editAuthor: async (root, args, context) => {
            if(!context.currentUser) {
                throw new AuthenticationError("authentication required")
            }
            const author = await Author.findOne({ name: args.name })
            author.born = args.setBornTo
            return author.save()
        },
        createUser: (root, args) => {
            const user = new User({
                username: args.username,
                favoriteGenre: args.favoriteGenre
            })
            return user.save()
                .catch(error => {
                    throw new UserInputError(error.message, {
                        invalidArgs: args
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if(!user || args.password !== 'secret') {
                throw new UserInputError("wrong credentials")
            }
            const userForToken = {
                username: user.username,
                id: user._id
            }
            return { value: jwt.sign(userForToken, process.env.SECRET) }
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        const auth = req ? req.headers.authorization : null
        if(auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})