import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Header = ({ auth: { isAuthenticated }, logout }) => {

    const landLinks = (
        <div className='header'>
            <Link to='/'>Signup</Link> {' | '}
            <Link to='/login'>Login</Link>
        </div>
    )

    const authLinks = (
        <div className='header'>
            <a href='/login' onClick={logout}>LOGOUT</a>
        </div>
    )

    return (
        <Fragment>{ isAuthenticated ? authLinks : landLinks }</Fragment>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

Header.propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
}

export default connect(mapStateToProps ,{ logout })(Header)
