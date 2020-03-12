import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

const blog = {
    title: 'title1',
    author: 'author1',
    url: 'www.url.com'
}

describe('<BlogForm />', () => {
    let component
    const createBlogMockHandler = jest.fn()
    
    beforeEach(() => {
        component = render(
            <BlogForm
                createBlog={createBlogMockHandler}
            />    
        )
    })
    
    test('createBlog callback with correct data', async () => {

        const titleInput = component.container.querySelector('#titleInput')
        const authorInput = component.container.querySelector('#authorInput')
        const urlInput = component.container.querySelector('#urlInput')
        const form = component.container.querySelector('form')
        
        fireEvent.change(titleInput, {
            target: { value: blog.title }
        })

        fireEvent.change(authorInput, {
            target: { value: blog.author }
        })

        fireEvent.change(urlInput, {
            target: { value: blog.url }
        })

        expect(createBlogMockHandler.mock.calls.length).toBe(0)
        fireEvent.submit(form)
        expect(createBlogMockHandler.mock.calls.length).toBe(1)

        expect(createBlogMockHandler.mock.calls[0][0]).toEqual(blog)

    })

})