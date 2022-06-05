import styled from "styled-components";
import tree from "../assets/tree.jpg"
import { useParams, useNavigate } from "react-router-dom";

const SinglePost =()=>{
    const { id } = useParams();
 

    return(
        <Wrapper>
        SinglePost

        </Wrapper>
    )
};

export default SinglePost;

const Wrapper=styled.div`

`
