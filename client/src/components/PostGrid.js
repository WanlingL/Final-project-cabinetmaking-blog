import styled from "styled-components";
import { UserContext } from "./Context/UserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

const PostGrid =()=>{

    const {posts, setPosts} = useContext(UserContext);

    
    return(
        <Wrapper>
            
        {posts.map((post, index)=>{
            return(
                <Link to={`/blog/${post.id}`}>
                    <PostInfo key={index}>
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


a {
    text-decoration: none;
    color: #6F675C;
}
h2{
    font-size: 20px;
}

p{
    font-size: 12px;
}
`
const PostInfo=styled.div`
   
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 30px;
    margin: 20px;
    padding: 20px;
    border-radius: 5px;
    height: 150px;
    width:300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    justify-content: center;

:hover {
    transform: scale(1.03);
  }

p{
    margin-top: 10px;
}
`