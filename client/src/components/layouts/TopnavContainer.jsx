import Navbar from './Topnav';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(
    mapStateToProps,
    {}
)(withRouter(Navbar));