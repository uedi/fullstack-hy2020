describe('Blog app', function() {
    this.beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        
        const user = {
            name: 'Dude',
            username: 'dude',
            password: 'password1'
        }
        cy.request('POST', 'http://localhost:3001/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log in to application')
    })
    
    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('dude')
            cy.get('#password').type('password1')
            cy.get('#login-button').click()
            cy.contains('Dude logged in')
        })

        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('aaaaa')
            cy.get('#password').type('bbbbb1')
            cy.get('#login-button').click()
            cy.contains('wrong username or password')
            cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'dude', password: 'password1' })
        })

        it('A blog can be created', function() {
            cy.get('html').should('not.contain', 'test title')
            
            cy.contains('new blog').click()
            cy.get('#titleInput').type('test title')
            cy.get('#authorInput').type('test author')
            cy.get('#urlInput').type('http://test.com')
            cy.get('#createBlog').click()

            cy.contains('a new blog test title by test author added')
            cy.get('html').should('contain', 'test title')

        })

        it('A blog can be liked', function() {
            const blog = {
                title: 'title123',
                author: '"author123',
                url: 'http://url.com'
            }
            cy.createBlog(blog)
            cy.contains('title123')

            cy.contains('view').click()
            cy.contains('likes 0')
            cy.get('html').should('not.contain', 'likes 1')

            cy.contains('like').click()
            cy.contains('likes 1')
            cy.get('html').should('not.contain', 'likes 0')
        })

        it('A blog can be removed', function() {
            const title = 'title123'

            const blog = {
                title: title,
                author: 'author123',
                url: 'http://url.com'
            }
            cy.createBlog(blog)
            cy.contains('view').click()
            cy.contains(title)

            cy.contains('remove').click()
            cy.contains('blog removed')
            cy.get('html').should('not.contain', title)

        })

        it('Blogs are ordered by likes', function() {
            const blog1 = { title: "title1", author: 'author1', url: 'http://url1.com' }
            const blog2 = { title: "title2", author: 'author2', url: 'http://url2.com' }
            const blog3 = { title: "title3", author: 'author3', url: 'http://url3.com' }
            const blog4 = { title: "title4", author: 'author4', url: 'http://url4.com' }
 
            cy.createBlogWithLikes({ blog: blog1, likes: 1 })
            cy.createBlogWithLikes({ blog: blog2, likes: 3 })
            cy.createBlogWithLikes({ blog: blog3, likes: 2 })
            cy.createBlogWithLikes({ blog: blog4, likes: 4 })
            
            cy.contains(blog4.title)

            cy.get('.blogContentTopic').then( topics => {
                cy.wrap(topics[0]).contains(blog4.title)
                cy.wrap(topics[1]).contains(blog2.title)
                cy.wrap(topics[2]).contains(blog3.title)
                cy.wrap(topics[3]).contains(blog1.title)
            })

        })
    })

})