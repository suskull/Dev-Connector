import React from "react";
import { useState } from "react";
import {connect} from 'react-redux'
import {addPost} from '../../actions/posts'
const AddPost = ({posts : {post}, addPost}) => {
   const [text, setText] = useState('')
   const handleSubmit = e => {
       e.preventDefault();
       setText('')
       addPost({text})
   }
  return (
    <>
      <div class="post-form">
        <div class="bg-primary p">
          <h3>Say Something...</h3>
        </div>
        <form class="form my-1" onSubmit={e=>handleSubmit(e)}>
          <textarea
            name="text"
            value={text}
            cols="30"
            rows="5"
            placeholder="Create a post"
            onChange= {e => setText(e.target.value)}
            required
          ></textarea>
          <input type="submit" class="btn btn-dark my-1" value="Submit" />
        </form>
      </div>
    </>
  );
};


const mapStateToProps = state => ({
    posts: state.posts
})
export default connect(mapStateToProps, {addPost})(AddPost);
