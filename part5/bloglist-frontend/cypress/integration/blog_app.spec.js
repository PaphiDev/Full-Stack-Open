describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.createUser({ password: 'sekret', username: 'root', name: 'Root User' })
        cy.createUser({ password: 'sekret', username: 'root2', name: 'Root User 2' })

        cy.visit('http://localhost:3000')
        cy.contains('login').parent().find('button').click()
    })

    it('Login form is shown', function () {
        cy.contains('username')
        cy.contains('password')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.login({ password: 'sekret', username: 'root' })
            cy.contains('Root User logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('wrongusername')
            cy.get('#password').type('wrongpassword')
            cy.get('#login-button').click()

            cy.get('.error')
                .should('contain', 'Wrong password or username')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ password: 'sekret', username: 'root' })
        })

        it('A blog can be created', function () {
            cy.contains('new blog').parent().find('button').click()

            cy.get('#title').type('Test Title')
            cy.get('#author').type('Test Author')
            cy.get('#url').type('https://www.test.com')
            cy.get('#createButton').click()

            cy.get('.blog').should('have.length', 1)
        })

        it('A blog can be liked', function () {
            cy.createBlog({
                author: 'Test Author',
                title: 'Test Title',
                url: 'https://www.test.com',
                likes: 0,
            })

            cy.get('.blog').should('have.length', 1)

            cy.contains('show').parent().find('button').click()
            cy.contains('like').parent().find('button').click()
            cy.contains('likes: 1')
        })

        it('A blog can be deleted by a user who made it', function () {
            cy.createBlog({
                author: 'Test Author',
                title: 'Test Title',
                url: 'https://www.test.com',
                likes: 0,
            })

            cy.contains('show').parent().find('button').click()
            cy.contains('remove').click()

            cy.get('.blog').should('have.length', 0)
        })

        it('Cannot delete blog by another user', function () {
            cy.createBlog({
                author: 'Test Author',
                title: 'Test Title',
                url: 'https://www.test.com',
                likes: 0,
            })

            cy.contains('logout').click()

            cy.login({ password: 'sekret', username: 'root2' })
            cy.contains('Root User 2 logged in')

            cy.contains('show').parent().find('button').click()
            cy.contains('remove').should('not.exist')
        })

        describe('add blogs and make sure they are sorted', function () {
            beforeEach(function () {
                cy.createBlog({
                    author: 'Test Author 0',
                    title: 'Test Title 0',
                    url: 'https://www.test.com',
                    likes: 2,
                })

                cy.createBlog({
                    author: 'Test Author 1',
                    title: 'Test Title 1',
                    url: 'https://www.test.com',
                    likes: 0,
                })

                cy.createBlog({
                    author: 'Test Author 2',
                    title: 'Test Title 2',
                    url: 'https://www.test.com',
                    likes: 4,
                })
            })

            it('blogs are ordered by likes', function () {
                cy.get('.show').click({ multiple: true })

                cy.get('.blogInfo').then((blogs) => {
                    cy.wrap(blogs[0]).contains('likes: 4')
                    cy.wrap(blogs[1]).contains('likes: 2')
                    cy.wrap(blogs[2]).contains('likes: 0')
                })
            })
        })
    })
})
