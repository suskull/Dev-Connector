import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../actions/posts";
import Spinner from "../layout/Spinner";
import AddPost from "./AddPost";
import PostItem from "./PostItem";
const Posts = ({ getPosts, posts: { posts, isLoading } }) => {
  useEffect(() => {
      setTimeout(() => {
    getPosts();

      }, 500)
  }, []);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <h1 class="large text-primary">Posts</h1>
          <p class="lead">
            <i class="fas fa-user"></i> Welcome to the community!
          </p>

          <AddPost />
          <div class="posts">
            {posts?.map((post) => {
              return (
                  <PostItem post={post} key={post?.id}/>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts,
});
export default connect(mapStateToProps, { getPosts })(Posts);
