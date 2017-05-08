import React, {Component} from 'react';
import {connect} from 'react-redux';
import PostItem from './PostItem';
import PropTypes from 'prop-types';
import {fetchPosts} from '../redux/actions/postActions';

class Home extends Component {
    componentWillMount() {
        if (this.props.posts.length === 0) {
            this.props.fetchPosts();
        }
    }

    getStyles() {
        return {
            root: {
                maxWidth: '720px',
                margin: '30px auto'
            }
        }
    }

    render() {
        const styles = this.getStyles();
        const PostList = this.props.posts.map((post, i) => {
            return <PostItem key={i} post={post}/>
        });
        return (
            <div style={styles.root}>
                { PostList }
            </div>
        )
    }
}

Home.propTypes = {
    posts: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
};

export default connect(mapStateToProps, {fetchPosts})(Home);