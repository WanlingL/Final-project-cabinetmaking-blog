import styled from "styled-components";
import PostGrid from "./PostGrid";

const Blog = () => {

  return (
    <Wrapper>
        <PostGrid />
    </Wrapper>
  );
};

export default Blog;

const Wrapper = styled.div`
  width:500px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;

`;
