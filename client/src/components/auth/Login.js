import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'
import { Redirect } from 'react-router-dom'
import  Alert from '../layouts/Alert'

const Login = ({ isAuthenticated, login }) => {

    const [formData, setFormData] = useState({
        email: 'ashishyoel23@gmail.com',
        password: '123456'
    })

    const { email, password } = formData

    const changeHandler = e => setFormData({ ...formData, [e.target.name]: e.target.value }) 

    const onSubmit = e => {
        e.preventDefault()
        login(formData)
    }

    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div>
            <form onSubmit={e => onSubmit(e)}>
                <h1>Login</h1>
                <input 
                    type='email'
                    name='email'
                    autoComplete='off'
                    required
                    placeholder='email'
                    value={email}
                    onChange={e => changeHandler(e)}
                />
                <input 
                    type='password'
                    name='password'
                    autoComplete='off'
                    required
                    placeholder='password'
                    value={password}
                    onChange={e => changeHandler(e)}
                />
                <button>Login</button>
                <Alert msg='alert-auth' />
            </form>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    login: PropTypes.func.isRequired
}

export default connect(mapStateToProps, { login })(Login)
