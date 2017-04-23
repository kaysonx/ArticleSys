import React, {Component} from 'react';
import Radium from 'radium';
import ActionHome from 'material-ui/svg-icons/action/home';
import { Link } from 'react-router';

class Header extends Component {
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

    render() {
        const styles = this.getStyles();
        return (
            <header style={styles.header}>
                <div>
                    <Link to="/" key='1' style={styles.nav}>
                        <ActionHome color="#FFF"/>
                    </Link>
                </div>
                <div>
                    <Link to="/login" key='2' style={styles.nav}>
                        Login
                    </Link>
                </div>
            </header>
        );
    }
}

export default Radium(Header);