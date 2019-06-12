import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavItem, Dropdown, Divider } from 'react-materialize';


class Topnav extends Component {
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
                        alignLinks="right">
                        <NavItem href="">
                            Home
                        </NavItem>
                        <NavItem href="">
                            Accounts
                        </NavItem>
                        <NavItem href="">
                            Browse
                        </NavItem>
                        <Dropdown trigger={<Link>{this.props.auth.user.username}<i className="material-icons right">
                            arrow_drop_down
                                        </i></Link>}>
                            <a href="#">
                                Profile
                            </a>
                            <a href="#">
                                Settings
                            </a>
                            <Divider />
                            <a href="#">
                                Logout
                            </a>
                        </Dropdown>
                    </Navbar>
                </div>
                // <div className="navbar-fixed">
                //     <ul id="dropdown1" className="dropdown-content">
                //         <li><Link to="#!">Profile</Link></li>
                //         <li><Link to="#!">Settings</Link></li>
                //         <li><Link to="#!">Logout</Link></li>
                //     </ul>
                //     <nav className="z-depth-0">
                //         <div className="nav-wrapper indigo accent-3">
                // <Link
                //     to="/dashboard"
                //     style={{
                //         fontFamily: "monospace"
                //     }}
                //     className="brand-logo">
                //     <i className="material-icons">code</i>
                //     CDzy
                //             </Link>
                //             <ul className="right hide-on-med-and-down">
                //                 <li>
                //                     <Link to="/dashboard">Home</Link>
                //                 </li>
                //                 <li>
                //                     <Link to="/accounts">Accounts</Link>
                //                 </li>
                //                 <li>
                //                     <Link to="/browse">Browse</Link>
                //                 </li>
                //                 <li>
                //                     <a href="#!"
                //                         className="dropdown-trigger"
                //                         data-target="dropdown1"
                //                     >
                //                         {this.props.auth.user.username}
                // <i className="material-icons right">
                //     arrow_drop_down
                //                         </i>
                //                     </a>
                //                 </li>
                //             </ul>
                //         </div>
                //     </nav>
                // </div>
            );
        return null;
    }
}

export default Topnav;