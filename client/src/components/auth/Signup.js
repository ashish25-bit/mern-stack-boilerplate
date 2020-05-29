import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { signup } from '../../actions/auth'
import { Redirect } from 'react-router-dom'
import Alert from '../layouts/Alert'

const Signup = ({ isAuthenticated, signup }) => {

    const [formData, setFormData] = useState({
        name: 'Ashish',
        email: 'sample@gmail.com',
        password: '123456',
    })

    const { name, email, password } = formData

    const changeHandler = e => setFormData(({ ...formData, [e.target.name]: e.target.value }))

    const onSubmit = e => {
        e.preventDefault()
        signup(formData)
    }

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div>
            <form onSubmit={e => onSubmit(e)}>
                <h1>Signup</h1>
                <div>
                    <input
                        type='text'
                        name='name'
                        autoComplete='off'
                        required
                        placeholder='name'
                        value={name}
                        onChange={e => changeHandler(e)}
                    />
                </div>
                <div>
                    <input
                        type='email'
                        name='email'
                        autoComplete='off'
                        required
                        placeholder='email'
                        value={email}
                        onChange={e => changeHandler(e)}
                    />
                </div>
                <div>
                    <input
                        type='password'
                        name='password'
                        autoComplete='off'
                        required
                        placeholder='password'
                        value={password}
                        onChange={e => changeHandler(e)}
                    />
                </div>
                <button>Register</button>
                <Alert msg='alert-auth' />
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

Signup.propTypes = {
    isAuthenticated: PropTypes.bool,
    signup: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { signup })(Signup)
