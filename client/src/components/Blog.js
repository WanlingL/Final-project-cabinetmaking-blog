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
  /* display: flex; */
	flex-direction: row;
	flex-wrap: wrap;
  align-content: center;
  align-items: center;

`;
