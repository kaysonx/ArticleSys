import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Radium from 'radium';
import {connect} from 'react-redux';
import {signup} from '../redux/actions/authActions';
import PropTypes from 'prop-types';

class SignUp extends Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getStyles() {
        return {
            root: {
                backgroundColor: '#fff',
                boxShadow: '0 0 0 1px rgba(200, 215, 225, 0.5), 0 1px 2px #e9eff3',
                textAlign: 'center',
                padding: '0 1em 1em',
                margin: '30px 16px',
                '@media (min-width: 400px)': {
                    width: '400px',
                    margin: '30px auto'
                }
            },
            textField: {
                display: 'block',
                width: '100%',
                fontSize: '.9em'
            },
            label: {
                fontWeight: '600',
                fontSize: '1em',
                lineHeight: '40px'
            },
            button: {
                width: '130px',
                height: '40px',
                marginTop: '30px',
                marginBottom: '15px'
            },
            a: {
                fontSize: '.8em',
                textDecoration: 'none',
                color: 'gray',
                ':hover': {color: '#00bcd4'}
            }
        };
    }

    handleSubmit(e) {
        e.preventDefault();
        let username = this.refs.username.getValue();
        let password = this.refs.password.getValue();
        let confirmPassword = this.refs.confirmPassword.getValue();
        if (password !== confirmPassword) {
            console.log("密码不匹配");
            return;
        }
        console.log(username, password, confirmPassword);
        this.props.signup({username, password});
    }

    render() {
        let styles = this.getStyles();
        return (
            <div style={styles.root}>
                <form onSubmit={this.handleSubmit}>
                    <TextField ref='username' style={styles.textField} floatingLabelText="用户名"/>
                    <TextField ref='password' style={styles.textField} floatingLabelText="密码" type="password"/>
                    <TextField ref='confirmPassword' style={styles.textField} floatingLabelText="确认密码" type="password"/>
                    <RaisedButton primary={true} style={styles.button} labelStyle={styles.label} label="注册"
                                  type="submit"/>
                </form>
            </div>
        )
    }
}

SignUp.propTypes = {
    signup: PropTypes.func.isRequired
};

export default connect(null, {signup})(Radium(SignUp));