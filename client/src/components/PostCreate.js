import React, { useState } from "react";
import "./componentsStyles/postCreateStyle.css";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://posts.com/posts/create", {
        title,
      });
    } catch (error) {
      setError(error.type);
    }
  };
  return (
    <div className="creator-container">
      <form onSubmit={handleSubmit} className="createPostForm">
        <h3>Create Post</h3>
        <TextField
          id="standard-basic"
          label="Title"
          placeholder="Enter the title of the blog"
          className="title-input"
          onChange={handleChange}
          value={title}
        />
        <Button
          className="submit-btn"
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};
export default PostCreate;
