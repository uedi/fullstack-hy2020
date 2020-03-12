const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'ADD_BLOG':
            return [...state, action.data]
        case 'UPDATE_BLOG':
            const id = action.data.id
            return state.map(blog => blog.id !== id ? blog : action.data)
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data)
        default:
            return state
    }
}

export const initBlogs = (blogs) => {
    return {
        type: 'INIT_BLOGS',
        data: blogs
    }
}

export const createBlog = (blog) => {
    return {
        type: 'ADD_BLOG',
        data: blog
    }
}

export const updateBlog = (blog) => {
    return {
        type: 'UPDATE_BLOG',
        data: blog
    }
}

export const removeBlog = (id) => {
    return {
        type: 'REMOVE_BLOG',
        data: id
    }
}

export default blogReducer