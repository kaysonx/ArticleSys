import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getPost, clearPost} from '../redux/actions/postActions';
import {Settings} from '../settings';
import isEmpty from 'lodash/fp/isEmpty';
import PropTypes from 'prop-types';

class ShowPost extends Component {
    componentWillMount() {
        this.props.getPost(this.props.params.post_id);
    }

    componentWillUnmount() {
        this.props.clearPost();
    }

    getStyles() {
        return {
            cover: {
                backgroundImage: isEmpty(this.props.post) ? 'none' : `url(${Settings.host}/uploads/images/${this.props.post.image})`,
                height: '500px',
                position: 'relative',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center center'
            },
            container: {
                maxWidth: '960px',
                margin: '56px auto 0'
            },
            title: {
                fontSize: '28px',
                lineHeight: '28px',
                color: '#2e4453',
                paddingBottom: '48px'
            },
            content: {
                color: '#666'
            }
        }
    }

    render() {
        const styles = this.getStyles();
        return (
            <div>
                <div style={styles.cover}></div>
                <div style={styles.container}>
                    <div style={styles.title}>{this.props.post.title}</div>
                    <div style={styles.content}>{this.props.post.content}</div>
                </div>
            </div>
        );
    }
}

ShowPost.propTypes = {
    post: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    post: state.post
});

export default connect(mapStateToProps, {getPost, clearPost})(ShowPost);

