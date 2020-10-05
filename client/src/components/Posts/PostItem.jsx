import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import {addLike, removeLike, deletePost} from '../../actions/posts'

const PostItem = ({ post, auth, addLike, removeLike, deletePost }) => {
  return (
    <>
      <div class="post bg-white p-1 my-1">
        <div>
          <Link to="/profile">
            <img class="round-img" src={post.avatar} alt="" />
            <h4>{post?.name}</h4>
          </Link>
        </div>
        <div>
          <p class="my-1">{post?.text}</p>
          <p class="post-date">
            Posted:{" "}
            {post?.date ? (
              <Moment format="YYYY/MM/DD">{post.date}</Moment>
            ) : (
              <Moment format="YYYY/MM/DD">
                {" "}
                {new Date().toLocaleDateString()}
              </Moment>
            )}
          </p>
          <button type="button" class="btn btn-light" onClick= {() => addLike(post?._id)}>
            <i class="fas fa-thumbs-up"></i> {' '}
            {post?.likes?.length >0 && <span>{post?.likes?.length}</span>}
          </button>
          <button type="button" class="btn btn-light" onClick= {() => removeLike(post?._id)}>
            <i class="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/post/${post?._id}`} class="btn btn-primary">
            Discussion{" "}
            {post?.comment?.length >0  && (
              <span class="comment-count">{post?.comment?.length}</span>
            )}
          </Link>
          {post.user === auth.user._id ? (
            <button type="button" class="btn btn-danger" onClick={() => deletePost(post._id)}>
              <i class="fas fa-times"></i>
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, {addLike, removeLike, deletePost})(PostItem);
