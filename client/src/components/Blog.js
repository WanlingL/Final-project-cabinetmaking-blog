import styled from "styled-components";
import { Link } from "react-router-dom";
import PostGrid from "./PostGrid";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Context/UserContext";

const Blog = () => {
  const { posts, setPosts } = useContext(UserContext);
  const { isLoaded, setIsLoaded } = useContext(UserContext);

  useEffect(() => {
    fetch("/api/get-blog-posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setIsLoaded(true);
        console.log("Blog data", data);
      })
      .catch((error) => {
        console.log("Blog.js error", error);
      });
  }, []);

  return (
    <Wrapper>
      <Link to="/blog/:postId">
        <PostGrid />
      </Link>
    </Wrapper>
  );
};

export default Blog;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
`;
