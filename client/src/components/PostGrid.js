import styled from "styled-components";
import postCover from "../assets/postCover.jpg"
import { UserContext } from "./Context/UserContext";
import { useContext, useEffect, useState } from "react";

const PostGrid =()=>{

    const {posts, setPosts} = useContext(UserContext);
    const {isLoaded, setIsLoaded} = useContext(UserContext);
    
    // useEffect(() => {
    //     fetch("/api/get-blog-posts")
    //       .then((response) => response.json())
    //       .then((data) => {
    //         setPosts(data.data);
    //         setIsLoaded(true);
    //         console.log("data data",data.data)
    //       })
    //       .catch((error) => {
    //         console.log("PostGrid.js error", error);
    //       });
    //   }, []);

    return(
        <Wrapper>
            <img src={postCover}/>
            <PostInfo>

                <h2>Post title</h2>
                <p>Post  date</p>

            </PostInfo>
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
    flex-direction: column;
    align-items: center;
`