import React from 'react'
import propTypes from 'prop-types'

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => {
    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    username
                    <input
                        id="username"
                        value={username}
                        onChange={({ target }) => handleUsernameChange(target.value)}
                    />
                </div>
                <div>
                    password{' '}
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={({ target }) => handlePasswordChange(target.value)}
                    />
                </div>
                <button id="login-button" type="submit">
                    login
                </button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: propTypes.func.isRequired,
    handleUsernameChange: propTypes.func.isRequired,
    handlePasswordChange: propTypes.func.isRequired,
    username: propTypes.string.isRequired,
    password: propTypes.string.isRequired,
}

export default LoginForm
