import React, {Component} from 'react';
import Radium from 'radium';
import {Settings} from '../settings';
import {connect} from 'react-redux';
import PostActionList from './PostActionList';
import PropTypes from 'prop-types';
import {Link} from 'react-router';

class PostItem extends Component {
    getStyles() {
        return {
            root: {
                marginLeft: 'auto',
                marginRight: 'auto',
                backgroundColor: '#fff',
                border: '1px solid rgba(200, 215, 225, 0.5)',
                boxShadow: ' 0 1px 2px #e9eff3',
                marginBottom: '24px',
                position: 'relative'
            },
            content: {
                padding: '16px 24px 12px',
                lineHeight: '1.3em'
            },
            title: {
                color: '#2e4453',
                fontWeight: '600',
                fontSize: '1.2em',
                textDecoration: 'none'
            },
            cover: {
                borderBottom: 'solid 1px rgba(200, 215, 225, 0.5)',
                maxHeight: '300px',
                overflowY: 'hidden',
            },
            image: {
                display: 'block',
                width: '100%'
            }
        }
    }

    render() {
        const styles = this.getStyles();
        const {post , isAuthenticated, currentUser} = this.props;
        return (
            <div style={styles.root}>
                <div style={styles.cover}>
                    <img src={`${Settings.host}/uploads/images/${post.image}`} style={styles.image}/>
                </div>
                <div style={styles.content}>
                    <Link  to={`/posts/${post._id}`} style={styles.title}>
                        {post.title}
                    </Link>
                </div>
                {isAuthenticated && currentUser.admin ? <PostActionList post={post}/> : ''}
            </div>
        )
    }
}

PostItem.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    currentUser: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(Radium(PostItem));