import React, { useEffect, useState } from "react";
import axios from "axios";
import "./componentsStyles/postListStyle.css";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";
import CardContent from "@material-ui/core/CardContent";
const PostList = () => {
  const [posts, setPosts] = useState([]);
  const handleRequest = async () => {
    // const response = await axios.get("http://localhost:4002/posts");
    const response = await axios.get("http://posts.com/posts");
    console.log(response.data);
    setPosts(Object.values(response.data));
  };
  useEffect(() => {
    handleRequest();
  }, []);
  return (
    <div>
      <h2>Posts</h2>
      <Grid container spacing={3}>
        {posts.map((post) => {
          return (
            <Grid key={post.id} item xs={6} sm={3}>
              <Card className="PostContainer">
                <CardContent>
                  <h3 className="post-title">{post.title}</h3>
                  <CommentList
                    comments={post.comments}
                    id={post.id}
                  />
                  <CommentCreate id={post.id} />
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
export default PostList;
