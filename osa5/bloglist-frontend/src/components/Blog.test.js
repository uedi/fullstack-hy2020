import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
    title: 'title1',
    author: 'author1',
    likes: 2,
    url: 'www.url.com'
}

describe('<Blog />', () => {
    let component
    const updateBlogMockHandler = jest.fn()
    const removeBlogMockHandler = jest.fn()
    
    beforeEach(() => {
        component = render(
            <Blog 
                blog={blog}
                updateBlog={updateBlogMockHandler}
                removeBlog={removeBlogMockHandler}
            />    
        )
    })

    test('renders content', () => {
    
        expect(component.container.querySelector('.blogContentTopic')).toBeVisible()
        expect(component.container.querySelector('.blogContentToView')).not.toBeVisible()
        
    })

    test('renders content after clicking view', async () => {
    
        const viewButton = component.getByText('view')
        fireEvent.click(viewButton)
    
        expect(component.container.querySelector('.blogContentTopic')).toBeVisible()
        expect(component.container.querySelector('.blogContentToView')).toBeVisible()
    
    })

    test('updateBlog is called when pressing like button', async () => {
        const viewButton = component.getByText('view')
        const likeButton = component.getByText('like')

        fireEvent.click(viewButton)
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(updateBlogMockHandler.mock.calls.length).toBe(2)
        expect(removeBlogMockHandler.mock.calls.length).toBe(0)

    })

})



