import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        if (this.props.auth.isAuthenticated)
            return (
                <div className="navbar-fixed">
                    <nav className="z-depth-0">
                        <div className="nav-wrapper indigo accent-3">
                            <Link
                                to="/"
                                style={{
                                    fontFamily: "monospace"
                                }}
                                className="brand-logo">
                                <i className="material-icons">code</i>
                                CDzy
                            </Link>
                            <ul className="right hide-on-med-and-down">
                                <li>
                                    <Link to="/dashboard">Home</Link>
                                </li>
                                <li>
                                    <Link to="/accounts">Accounts</Link>
                                </li>
                                <li>
                                    <Link to="/browse">Browse</Link>
                                </li>
                                <li>
                                    <Link to="#">
                                        {this.props.auth.user.username}
                                        <i class="material-icons right">
                                            arrow_drop_down
                                        </i>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            );
        return null;
    }
}

export default Navbar;