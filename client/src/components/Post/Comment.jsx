import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/posts";

const Comment = ({ comments, auth , post, deleteComment}) => {
  console.log(auth);
  return (
    <>
      {comments?.map((comment) => {
        return (
          <div class="comments">
            <div class="post bg-white p-1 my-1">
              <div>
                <Link to={`/profile/${comment.user}`}>
                  <img class="round-img" src={comment.avatar} alt="" />
                  <h4>{comment.name}</h4>
                </Link>
              </div>
              <div>
                <p class="my-1">{comment.text}</p>
                <p class="post-date">
                  Posted on <Moment format="YYYY/MM/DD">{comment.date}</Moment>
                </p>
                {auth.user._id === comment.user ? (
                  <>
                    {" "}
                    <button type="button" class="btn btn-danger" onClick={() => deleteComment(post._id, comment._id)}>
                      <i class="fas fa-times"></i>
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps,{deleteComment})(Comment);
