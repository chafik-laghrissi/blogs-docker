import React from "react";

const CommentList = ({ id, comments }) => {
  return (
    <div>
      <ul>
        {comments.map((comment) => {
          switch (comment.status) {
            case "pending":
              return (
                <li key={comment.id}>this comment is waiting for moderation</li>
              );
            case "rejected":
              return <li key={comment.id}>this comment has been rejected</li>;
            case "approved":
              return <li key={comment.id}>{comment.content}</li>;
            default:
              return <li key={comment.id}>{comment.content}</li>;
          }
        })}
      </ul>
    </div>
  );
};
export default CommentList;
