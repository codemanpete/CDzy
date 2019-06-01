import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';

class Dashboard extends Component {
    onLogoutClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const { user } = this.props.auth;
        return (
            <div>
                <div>
                    <div>
                        <h4>
                            <b>Hey there,</b>
                            {user.username}
                            <p>
                                You are logged into a full-stack{" "}
                                <span style={{
                                    fontFamily: "monospace"
                                }}>MERN</span>
                                &nbsp;app
                            </p>
                        </h4>
                        <button
                            onClick={this.onLogoutClick.bind(this)}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);