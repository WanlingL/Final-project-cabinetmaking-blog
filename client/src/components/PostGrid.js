import styled from "styled-components";
import postCover from "../assets/postCover.jpg"


const PostGrid =()=>{

    return(
        <Wrapper>

            <img src={postCover}/>
            <PostInfo>
                <h2>Post Title</h2>
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