import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavItem, Dropdown, Divider } from 'react-materialize';


class Topnav extends Component {
    handleLogout(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        if (this.props.auth.isAuthenticated)
            return (
                <div>
                    <Navbar
                        brand={
                            <Link
                                to="/dashboard"
                                style={{
                                    fontFamily: "monospace"
                                }}
                                className="brand-logo">
                                <i className="material-icons">code</i>
                                CDzy
                            </Link>
                        }
                        alignLinks="right"
                        className="indigo accent-3"
                    >
                        <NavItem href="/dashboard">
                            Home
                        </NavItem>
                        <NavItem href="/accounts">
                            Accounts
                        </NavItem>
                        <NavItem href="/browse">
                            Browse
                        </NavItem>
                        <Dropdown
                            trigger={
                                <Link>
                                    {this.props.auth.user.username}
                                    <i className="material-icons right">
                                        arrow_drop_down
                                    </i>
                                </Link>}>
                            <a href="/profile">
                                Profile
                            </a>
                            <a href="/settings">
                                Settings
                            </a>
                            <Divider />
                            <a onClick={this.handleLogout.bind(this)}>
                                Logout
                            </a>
                        </Dropdown>
                    </Navbar>
                </div>
            );
        return null;
    }
}

export default Topnav;