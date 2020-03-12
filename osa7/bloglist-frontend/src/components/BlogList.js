import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
  } from '@material-ui/core'

const BlogList = () => {
    
    const blogs = useSelector(state => state.blogs)
    const blogsToShow = blogs.sort((a, b) => b.likes - a.likes)

    return (
        <div>
            <h2>blogs</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        {blogsToShow.map(blog =>
                            <TableRow key={blog.id}>
                                <TableCell>
                                    <Link to={`/blogs/${blog.id}`}>{blog.title} ({blog.author})</Link>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </ TableContainer>
        </div>
    )
}

export default BlogList