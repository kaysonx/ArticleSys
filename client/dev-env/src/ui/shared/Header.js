import React, {Component} from 'react';
import Radium from 'radium';
import ActionHome from 'material-ui/svg-icons/action/home';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../../redux/actions/authActions'


class Header extends Component {
    constructor(){
        super();
        this.logout = this.logout.bind(this);
    }
    getStyles() {
        const styles = {
            header: {
                position: 'fixed',
                zIndex: '100',
                top: 0,
                right: 0,
                left: 0,
                backgroundColor: '#00bcd4',
                borderBottom: '1px solid #0079aa',
                height: '47px',
                paddingLeft: '16px',
                paddingRight: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            },
            nav: {
                color: 'white',
                paddingLeft:'20px',
                opacity: '.8',
                fontWeight: '600',
                fontSize: '1em',
                textDecoration: 'none',
                ':hover': {
                    cursor: 'pointer',
                    textDecoration: 'underline'
                }
            }
        };
        return styles;

    }

    logout(e){
        e.preventDefault();
        this.props.logout();
    }


    render() {
        const styles = this.getStyles();
        const {isAuthenticated, currentUser} = this.props.auth;
        const LogoutLink = (
            <div>
                <span style={{color: 'rgb(255,226, 0)', paddingRight: '15px'}}>{ currentUser.name }</span>
                <Link to='/' onClick={this.logout} style={styles.nav}>退出</Link>
            </div>
        );
        const LoginLink = (
            <div>
                <Link to='/login' style={styles.nav}>登录</Link>
                <Link to='/signup' style={styles.nav}>注册</Link>
            </div>
        );
        return (
            <header style={styles.header}>
                <div>
                    <Link to="/" key='1' style={styles.nav}>
                        <ActionHome color="#FFF"/>
                    </Link>
                </div>
                <div>
                    {isAuthenticated ? LogoutLink : LoginLink}
                </div>
            </header>
        );
    }
}

Header.protoTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
};

export default connect(mapStateToProps, {logout})(Radium(Header));