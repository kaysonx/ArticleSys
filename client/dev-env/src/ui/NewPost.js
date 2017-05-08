import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import BasicForm from './BasicForm';
import {connect} from 'react-redux';
import {newPost} from '../redux/actions/postActions';

class NewPost extends Component {
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    getStyles() {
        return {
            root: {
                maxWidth: '720px',
                margin: '32px auto 0',
            },
            title: {
                textAlign: 'center',
                color: '#2e4453',
                fontSize: '1.3em'
            },
            submit: {
                textAlign: 'center',
                marginTop: '32px'
            }
        };
    }

    handleSubmit(e){
        e.preventDefault();
        const basic = this.refs.basic.getBasicFormValue();
        this.props.newPost(basic);
    }

    render() {
        const styles = this.getStyles();
        return (
            <div style={styles.root}>
                <p style={styles.title}>添加新文章</p>
                <form onSubmit={this.handleSubmit}>
                    <BasicForm ref="basic" />
                    <RaisedButton type="submit" label="发布" primary={true}/>
                </form>
            </div>
        )
    }
}

export default connect(null, {newPost})(NewPost);