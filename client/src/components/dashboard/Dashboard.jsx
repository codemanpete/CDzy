import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { claimAllowance } from '../../actions/authActions';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.renderClaimButton = this.renderClaimButton.bind(this);
        this.handleClaimClick = this.handleClaimClick.bind(this);
    }
    renderClaimButton() {
        const { user } = this.props.auth;
        const now = new Date();
        const then = new Date(user.balance.lastClaim);
        if (now - then < 1 * 60 * 60 * 1000) {
            return (<div>Must wait</div>);
        }
        return (<div>Claim $15</div>);
    }

    handleClaimClick() {
        const { user } = this.props.auth;
        this.props.claimAllowance(user.id);
    }

    render() {
        const { user } = this.props.auth;
        return (
            <div style={{
                height: "75vh"
            }} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12 center-align">
                        <h4>
                            <b>Hey there,</b>&nbsp;
                            {user.username}
                            <p className="flow-text grey-text text-darken-1">
                                Your balance is ${ user.balance.amount }
                            </p>
                        </h4>
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            onClick={this.handleClaimClick}
                            className="btn btn-large waves-effect waves-light
                                hoverable blue accent-3"
                        >
                            {this.renderClaimButton()}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(
    mapStateToProps,
    { claimAllowance }
)(Dashboard);