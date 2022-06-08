import styled from "styled-components";
import { Link } from "react-router-dom";
import PostGrid from "./PostGrid";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./Context/UserContext";

const Blog = () => {
  const { posts, setPosts } = useContext(UserContext);
  const { isLoaded, setIsLoaded } = useContext(UserContext);

  return (
    <Wrapper>
        <PostGrid />
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
