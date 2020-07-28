import React from "react";

export default ({ comments }) => {
  const renderedComments = comments.map((comment) => {
    let content;

    //console.log(comment);
    if ((comment.type = "approved")) {
      content = comment.content;
    }

    if (comment.type === "pending") {
      content = "This comment is awaiting for moderation.";
    }

    if (comment.status === "rejected") {
      content = "This comment has been rejected";
    }

    return <li key={comment.id}> {content}</li>;
  });

  return <ul>{renderedComments}</ul>;
};
