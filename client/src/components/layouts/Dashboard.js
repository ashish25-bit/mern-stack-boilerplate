import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Dashboard = ({ auth: { user } }) => {
    return (
        <div style={divStyle}>
            <h2>{user.name}</h2>
            <h4>{user.email}</h4>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
}

const divStyle = {
    width: "600px",
    margin: "10px auto",
}

export default connect(mapStateToProps, {})(Dashboard)
