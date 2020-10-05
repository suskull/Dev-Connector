import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getPostById } from "../../actions/posts";
import Spinner from "../layout/Spinner";
import Comment from "./Comment";
import AddComment from "./AddComment";
const Post = ({ posts: { isLoading, post }, getPostById, match }) => {
  useEffect(() => {
    setTimeout(() => {
      getPostById(match?.params?.id);
    }, 500);
  }, [match.params.id]);
  console.log(match?.params?.id);
  return (
    <>
      {post === null ? (
        <Spinner />
      ) : (
        <>
          {" "}
          <Link to="/posts" class="btn">
            Back To Posts
          </Link>
          
          <div class="post bg-white p-1 my-1">
            <div>
              <Link to={`/profile/${post.user}`}>
                <img class="round-img" src={post?.avatar} alt="" />
                <h4>{post?.name}</h4>
              </Link>
            </div>
            <div>
              <p class="my-1">{post?.text}</p>
            </div>
          </div>

          <AddComment post ={post}/>
          {" "}

          <Comment comments={post.comment} post={post}/>

          
        </>
      )}
    </>
  );
};
const mapStateToProps = (state) => ({
  posts: state.posts,
});
export default connect(mapStateToProps, { getPostById })(Post);
