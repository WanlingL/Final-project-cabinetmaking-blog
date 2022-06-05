import styled from "styled-components";
import { Link } from "react-router-dom";
import PostGrid from "./PostGrid"
import SideBar from "./SideBar";

const Blog =()=>{

    return(
        <Wrapper>
            
                <Link to="/blog/:postId"><PostGrid /></Link>
                <Link to="/blog/:postId"><PostGrid /></Link>
                <Link to="/blog/:postId"><PostGrid /></Link>

        </Wrapper>
    )
};

export default Blog;

const Wrapper=styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-content: center;
    
`
