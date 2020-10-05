import React from 'react'
import { useState } from 'react'
import {connect} from 'react-redux'
import {addComment} from '../../actions/posts'
const AddComment = ({addComment, post}) => {
    const [text, setText] = useState('')
    const handleSubmit = e => {
        e.preventDefault();
        addComment(post._id, {text});
        setText('');
    }

    console.log(post._id)
    return (
        <>
          <div class="post-form">
            <div class="bg-primary p">
              <h3>Leave A Comment</h3>
            </div>
            <form class="form my-1" onSubmit={e => handleSubmit(e)}>
              <textarea
                name="text"
                value={text}
                cols="30"
                rows="5"
                placeholder="Comment on this post"
                onChange={(e =>setText(e.target.value))}
                required
              ></textarea>
              <input type="submit" class="btn btn-dark my-1" value="Submit" />
            </form>
          </div>
        </>
    )
}

export default connect(null, {addComment})(AddComment)
