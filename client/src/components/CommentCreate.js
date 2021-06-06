import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./componentsStyles/commentCreateStyle.css";
import axios from "axios";
const CommentCreate = ({id}) => {
  const [content, setContent] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        await axios.post(`http://posts.com/posts/${id}/comments`,{
            content
        })
        setContent("")
    } catch (error) {
        console.log(error);
    }
  };
  const handleChange = (event) => {
    const { value } = event.target;
    setContent(value);
  };
  return (
    <form onSubmit={handleSubmit} className="Comment-create-container">
      <TextField
        id="outlined-basic"
        label="Add comment"
        variant="outlined"
        value={content}
        onChange={handleChange}
      />
      <Button className="btn" variant="contained" color="primary" type="submit">
        Comment
      </Button>
    </form>
  );
};
export default CommentCreate;
