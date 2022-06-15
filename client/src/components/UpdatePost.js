import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState } from "react";

const UpdatePost = ({title, content, updateMode})=>{
    const navigate = useNavigate();
    const { postId } = useParams();

    const [editedTitle, setEditedTitle] = useState(title);
    const [editedContent, setEditedContent] = useState(content);
    const [success, setSuccess] = useState(false);

    const handlePostUpdated = (e) =>{
        e.preventDefault();
          fetch(`/api/edit-post/${postId}`,{
            method: "PATCH",
            headers:{
              Accept: "application/json",
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              title: editedTitle,
              content: editedContent
            })
          })
          .then((response) => response.json())
          .then((data) => {
            // console.log("data",data)// doesnt console??
            
            if (data.status === 200) {
              navigate(`/blog/${postId}`)
              setSuccess(true);
              updateMode(false)//turn back to unEdit mode
            } else {
              setSuccess(false);
            }
          })
          .catch((error) => {
            console.error('Updatd Post Error', error);
        }); 
      }

      const handleReturn =() =>{
        navigate("/")
      }

    return(
        <Wrapper >
            <InputGroup>
                <h2>Updated Post</h2>
                <input value ={editedTitle} onChange={(e)=>{setEditedTitle(e.target.value)}} />
                <textarea value ={editedContent} onChange={(e)=>{setEditedContent(e.target.value)}} />
            </InputGroup>
            <ButtonGroup>
                <button type='submit' onClick ={handlePostUpdated}>Save</button>
                {success && <SuccessMessage>Post Updated</SuccessMessage> }
                <button type='submit' onClick ={handleReturn}>Return</button>
            </ButtonGroup>
        </Wrapper>
    )
};

export default UpdatePost;

const Wrapper = styled.div`
    width: 80vw;
    justify-content: center;
    align-content: center;
    align-items: center;
    margin-top: 50px;
    margin-left: 50px;


`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 70vw;

    h2{
      color:#464543;
      font-size: 20px;
    }
    
textarea{
    padding: 10px;
    width:70vw;
    height: 200px;
}
`;

const ButtonGroup= styled.div`
  
  button{
    margin-right: 15px;
  }
`;
const SuccessMessage = styled.div`
  margin-top: 10px;
  color:#C89B7D;
`;