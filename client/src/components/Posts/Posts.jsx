import React from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPosts } from "../../actions/posts";
import Spinner from "../layout/Spinner";
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

          <div class="post-form">
            <div class="bg-primary p">
              <h3>Say Something...</h3>
            </div>
            <form class="form my-1">
              <textarea
                name="text"
                cols="30"
                rows="5"
                placeholder="Create a post"
                required
              ></textarea>
              <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
          </div>

          <div class="posts">
            {posts?.map((post) => {
              return (
                <div key={post._id}>
                  <div class="post bg-white p-1 my-1">
                    <div>
                      <Link to="/profile">
                        <img class="round-img" src={post.avatar} alt="" />
                        <h4>{post?.name}</h4>
                      </Link>
                    </div>
                    <div>
                      <p class="my-1">{post?.text}</p>
                      <p class="post-date">Posted on 04/16/2019</p>
                      <button type="button" class="btn btn-light">
                        <i class="fas fa-thumbs-up"></i>
                        <span>{post?.likes?.length}</span>
                      </button>
                      <button type="button" class="btn btn-light">
                        <i class="fas fa-thumbs-down"></i>
                      </button>
                      <a href="post.html" class="btn btn-primary">
                        Discussion{" "}
                        <span class="comment-count">
                          {post?.comment?.length}
                        </span>
                      </a>
                      <button type="button" class="btn btn-danger">
                        <i class="fas fa-times"></i>
                      </button>
                    </div>
                  </div>
                </div>
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
