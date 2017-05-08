import React, {Component} from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import PostItem from './PostItem';
import PropTypes from 'prop-types';
import {fetchPosts} from '../redux/actions/postActions';

class DashBoard extends Component {

    componentWillMount(){
        if(this.props.posts.length === 0){
            this.props.fetchPosts();
        }
    }

    getStyles() {
        return {
            root: {
                maxWidth: '720px',
                margin: '30px auto'
            },
            actions: {
                marginTop: '32px',
                marginBottom: '32px',
                textAlign: 'center'
            }
        }
    }

    render() {
        const styles = this.getStyles();
        const PostList = this.props.posts.map((post, i) => (
                <PostItem key={i} post={post}/>
            )
        );
        return (
            <div style={styles.root}>
                <div style={styles.actions}>
                    <Link to="/posts/new">
                        <RaisedButton primary={true} label="添加新文章"/>
                    </Link>
                </div>
                {PostList}
            </div>
        )
    }
}

DashBoard.propTypes = {
    posts:PropTypes.array.isRequired
};

const mapStateToProps = (state) =>{
    return {
        posts:state.posts
    }
};

export default connect(mapStateToProps, {fetchPosts})(DashBoard);