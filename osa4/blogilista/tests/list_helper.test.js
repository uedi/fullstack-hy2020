const listHelper = require('../utils/list_helper')

const bloglist = [ 
    { _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0 },
    { _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0 },
    { _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0 },
    { _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0 },
    { _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0 },
    { _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0 }]

const countLikes = (blogs) => {
    let likes = 0
    bloglist.forEach(blog =>  {
        likes += blog.likes
    })
    return likes
}

const createBlogFor = (author, likes) => {
    return {
        _id: "5a422a851b54a676234d17f7",
        title: "Title",
        author: author,
        url: "",
        likes: likes ? likes : 2,
        __v: 0}
}

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })
    test('is calculated correctly when one blog', () => {
        const blogs = bloglist.slice(0, 1)
        expect(listHelper.totalLikes(blogs)).toBe(blogs[0].likes)
    })
    test('is calculated correctly when multiple blogs', () => {
        const result = countLikes(bloglist)
        expect(listHelper.totalLikes(bloglist)).toBe(result)
    })
    test('does not give error when field likes is missing', () => {
        blogs = bloglist.concat({_id: 1, title: "TTT", author: "AAA"})
        const result = countLikes(bloglist)
        expect(listHelper.totalLikes(blogs)).toBe(result)
    })
})

describe('favorite blog', () => {
    test('retuns null when no blogs', () => {
        expect(listHelper.favoriteBlog([])).toBe(null)
    })
    test('is the only one if no other blogs', () => {
        const blogs = bloglist.slice(0, 1)
        expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[0])
    })
    test('is the one with most likes', () => {
        expect(listHelper.favoriteBlog(bloglist)).toEqual(bloglist[2])
    })
    test('returns any one of blogs with most likes', () => {
        const blogs = bloglist.concat(bloglist[2])
        expect(listHelper.favoriteBlog(blogs).likes).toBe(bloglist[2].likes)
    })
})

describe('most blogs', () => {
    test('returns null when no blogs', () => {
        expect(listHelper.mostBlogs([])).toBe(null)
    })
    test('returns correct value if only one blogger', () => {
        const author = "first"
        const blogs = [createBlogFor(author),createBlogFor(author)]
        expect(listHelper.mostBlogs(blogs)).toEqual({ author: author, blogs: 2})
    })
    test('returns correct value if only one blog', () => {
        const author = "first"
        const blogs = [createBlogFor(author)]
        expect(listHelper.mostBlogs(blogs)).toEqual({ author: author, blogs: 1})
    })
    test('returns correct writer and count when multiple bloggers', () => {
        const author1 = "first"
        const author2 = "second"
        const author3 = "third"
        const blogs = [createBlogFor(author1), createBlogFor(author2), createBlogFor(author3), createBlogFor(author2), createBlogFor(author1), createBlogFor(author2)]
        expect(listHelper.mostBlogs(blogs)).toEqual({ author: author2, blogs: 3 })
    })
    test('returns correct amount for multiple most blogs', () => {
        const author1 = "first"
        const author2 = "second"
        const author3 = "third"
        const blogs = [createBlogFor(author1), createBlogFor(author2), createBlogFor(author3)]
        expect(listHelper.mostBlogs(blogs).blogs).toBe(1)
    })
})

describe('most likes', () => {
    test('returns null when no blogs', () => {
        expect(listHelper.mostLikes([])).toBe(null)
    })
    test('returns correct value if only one blogger', () => {
        const author = "first"
        const blogs = [createBlogFor(author, 4),createBlogFor(author, 5)]
        expect(listHelper.mostLikes(blogs)).toEqual({ author: author, likes: 9})
    })
    test('returns correct value if only one blog', () => {
        const author = "first"
        const blogs = [createBlogFor(author, 7)]
        expect(listHelper.mostLikes(blogs)).toEqual({ author: author, likes: 7})
    })
    test('returns correct writer and count when multiple bloggers', () => {
        const author1 = "first"
        const author2 = "second"
        const author3 = "third"
        const blogs = [createBlogFor(author1, 5), createBlogFor(author2, 5), createBlogFor(author3, 3), createBlogFor(author3, 4), createBlogFor(author2, 1)]
        expect(listHelper.mostLikes(blogs)).toEqual({ author: author3, likes: 7 })
    })
    test('returns correct amount for multiple most likes', () => {
        const author1 = "first"
        const author2 = "second"
        const author3 = "third"
        const blogs = [createBlogFor(author1, 6), createBlogFor(author2, 6), createBlogFor(author3, 6)]
        expect(listHelper.mostLikes(blogs).likes).toBe(6)
    })
})