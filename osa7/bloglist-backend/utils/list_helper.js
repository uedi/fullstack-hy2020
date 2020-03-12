const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return item.likes ? sum + item.likes : sum
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (previous, current) => {
        return (previous.likes > current.likes) ? previous : current
    }
    return (blogs && blogs.length > 0) ? blogs.reduce(reducer) : null
}

const bloggerWithHighestCount = (bloggers, count) => {
    const reducer = (previous, current) => {
        return (count[previous] > count[current]) ? previous : current
    }
    return bloggers.reduce(reducer)
}

const mostBlogs = (blogs) => {
    if(!blogs || blogs.length === 0) {
        return null
    }
    const blogcount = {}
    blogs.forEach(blog => {
        blogcount[blog.author] = blogcount[blog.author] ? blogcount[blog.author] + 1 : 1
    })
    const author = bloggerWithHighestCount(Object.keys(blogcount), blogcount)
    return { author: author, blogs: blogcount[author]}
}

const mostLikes = (blogs) => {
    if(!blogs || blogs.length === 0) {
        return null
    }
    const likescount = {}
    blogs.forEach(blog => {
        likescount[blog.author] = likescount[blog.author] ? likescount[blog.author] + blog.likes : blog.likes
    })
    const author = bloggerWithHighestCount(Object.keys(likescount), likescount)
    return { author: author, likes: likescount[author]}
}

module.exports = {
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    dummy
}