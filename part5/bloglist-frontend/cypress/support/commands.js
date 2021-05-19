Cypress.Commands.add('createUser', ({ username, password, name }) => {
    cy.request('POST', 'http://localhost:3000/api/users', { username, password, name })
})

Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3000/api/login', { username, password }).then(
        ({ body }) => {
            localStorage.setItem('loggedBlogUser', JSON.stringify(body))
            cy.visit('http://localhost:3000')
        }
    )
})

Cypress.Commands.add('createBlog', ({ author, title, url, likes }) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/blogs',
        body: { author, title, url, likes },
        headers: {
            Authorization: `bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`,
        },
    })

    cy.visit('http://localhost:3000')
})
