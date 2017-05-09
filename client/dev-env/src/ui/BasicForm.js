import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import CoverImageUpload from './CoverImageUpload';

class BasicForm extends Component {
    constructor() {
        super();
        this.state = {
            file: ''
        }
        this.getImage = this.getImage.bind(this);
    }

    getStyles() {
        return {
            root: {
                padding: '20px',
                marginTop: '32px',
                backgroundColor: '#fff',
                boxShadow: '0 0 0 1px rgba(200, 215, 225, 0.5), 0 1px 2px #e9eff3'
            },
            textField: {
                display: 'block',
                fontSize: '.85em',
                width: '100%'
            }
        }
    }

    getBasicFormValue() {
        const title = this.refs.title.getValue();
        const content = this.refs.content.getValue();
        const file = this.state.file;
        return {
            title,
            content,
            file
        }
    }

    getImage(file) {
        this.setState({
            file: file
        });
    }

    render() {
        const styles = this.getStyles();
        let {post} = this.props;
        return (
            <div style={styles.root}>
                <TextField defaultValue={post ? post.title : ''} ref="title" floatingLabelText="标题"
                           style={styles.textField}/>
                <div style={{marginTop: '15px', marginBottom: '15px'}}>
                    <TextField defaultValue={post ? post.content : ''} ref='content' floatingLabelText="内容"
                               multiLine={true} rows={5} style={styles.textField}/>
                </div>
                <CoverImageUpload image={post ? post.image : ''} handleImage={this.getImage} tip="上传照片"/>
            </div>
        )
    }

}

export default BasicForm;