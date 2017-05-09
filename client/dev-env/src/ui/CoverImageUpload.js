import React, {Component} from 'react';
import ContentAdd from 'material-ui/svg-icons/content/add';

class CoverImageUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    getStyles() {
        return {
            uploadWrapper: {
                marginTop: '20px',
                marginBottom: '30px',
                width: '180px',
                border: '1px solid #ddd',
                height: '180px',
                backgroundColor: '#f8f8f8',
                textAlign: 'center',
                backgroundImage: `url(${this.state.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
                position: 'relative'
            },
            uploadLabel: {
                display: this.state.image ? 'none' : 'block',
                height: '20px',
                lineHeight: '20px',
                fontSize: '13px',
                marginTop: '80px',
                marginBottom: '80px',
                cursor: 'pointer'
            },
            svg: {
                width: '20px',
                height: '20px'
            },
            uploadText: {
                display: 'inline-block',
                verticalAlign: 'top'
            },
            uploadButton: {
                display: 'none'
            },
            uploadLabelAdd: {
                display: this.state.image ? 'block' : 'none',
                backgroundColor: '#ddd',
                height: '24px',
                position: 'absolute',
                top: '0',
                right: '0',
                cursor: 'pointer'
            }
        }
    }

    handleChange(e) {
        const file = e.target.files[0];
        if (!file.type.match('image.*')) {
            console.log("请上传图片");
        } else {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.setState({
                    image: e.target.result
                });
            };
            reader.readAsDataURL(file);
        }
    }

    render() {
        const styles = this.getStyles();
        return (
            <div style={styles.uploadWrapper}>
                <label htmlFor="imageUploadBtn" style={styles.uploadLabel}>
                    <ContentAdd style={styles.svg}/>
                    <span style={styles.uploadText}>{this.props.tip}</span>
                </label>
                <label htmlFor="imageUploadBtn" style={styles.uploadLabelAdd}>
                    <ContentAdd/>
                </label>
                <input type="file" onChange={this.handleChange} id="imageUploadBtn" style={styles.uploadButton}/>
            </div>
        )
    }
}

export default CoverImageUpload;