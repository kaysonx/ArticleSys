import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import CoverImageUpload from './CoverImageUpload';

class BasicForm extends Component {
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
        return {
            title,
            content
        }
    }

    render() {
        const styles = this.getStyles();
        return (
            <div style={styles.root}>
                <TextField ref="title" floatingLabelText="标题" style={styles.textField}/>
                <div style={{marginTop: '15px', marginBottom: '15px'}}>
                    <TextField ref='content' floatingLabelText="内容" multiLine={true} rows={5} style={styles.textField}/>
                </div>
                <CoverImageUpload tip="上传照片" />
            </div>
        )
    }

}

export default BasicForm;