import styled from "styled-components";
import postCover from "../assets/postCover.jpg"
import { UserContext } from "./Context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostGrid =()=>{

    const {posts, setPosts} = useContext(UserContext);
    const {isLoaded, setIsLoaded} = useContext(UserContext);

    
    return(
        <Wrapper>
            <img src={postCover}/>
            
        {posts.map((post)=>{
            return(
                <Link to={`/blog/${post.id}`}>
                    <PostInfo key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.datePosted}</p>
                    </PostInfo>
                </Link>
            )
        })}
            
        </Wrapper>
    )
};

export default PostGrid;

const Wrapper=styled.div`
width:385px;
margin: 20px;

img{
    height: 285px;
    width: 100%;
    object-fit: cover;
}
`
const PostInfo=styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`