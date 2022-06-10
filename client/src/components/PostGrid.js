import styled from "styled-components";
import { UserContext } from "./Context/UserContext";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostGrid =()=>{

    const {posts, setPosts} = useContext(UserContext);
    const {isLoaded, setIsLoaded} = useContext(UserContext);

    
    return(
        <Wrapper>
            
        {posts.map((post, index)=>{
            return(
                <Link to={`/blog/${post.id}`}>
                    <PostInfo key={index}>
                        <img src={post.imgUrl}/>
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
width:400px;
display: flex;
flex-direction: row;
margin: 20px;


/* img{
    height: 285px;
    width: 100%;
    object-fit: cover;
} */
`
const PostInfo=styled.div`
   
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 30px;
    margin: 20px;
    padding: 20px;
    border-radius: 5px;
    height: 200px;
    width:300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

:hover {
    transform: scale(1.03);
  }

p{
    margin-top: 10px;
}
`