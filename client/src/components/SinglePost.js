import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import moment from "moment";
import UpdatePost from "./UpdatePost";

const SinglePost = () => {
  const { postId } = useParams();

  const [singlePost, setSinglePost] = useState({});
  const [postComments, setPostComments] = useState({})
  const [name, setName] = useState("")
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);
  const [updatedMode, setUpdateMode] = useState(false)

  //calling post content
  useEffect(() => {
    fetch(`/api/get-blog-post/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("SingolePost data",data.data)
        setSinglePost(data.data);
      })
      .catch((error) => {
        console.log("singlePost", error);
      });
  }, []);


   //calling post comment(using request.query)
   useEffect(() => {
    fetch(`/api/get-comments?post=${postId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("comment data",data.data)
        setPostComments(data.data);
      })
      .catch((error) => {
        console.log("post comment", error);
      });
  }, []);


  //submit comment
  const commentSubmitHandler = (e) => {
    e.preventDefault();
    
      fetch("/api/comment-on-post", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post: postId, //replace _id to post, so the _id will be the unique id
          name,
          time: moment().format("DD-MM-YYYY, hh:mm:ss a"),
          text: comment,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log("data",data)
        
        if (data.status === 200) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      });
  };
  
  return (
    <Wrapper>
      {updatedMode ? <UpdatePost title ={singlePost.title} content = {singlePost.content} updateMode={setUpdateMode}/> : 
      //past "updateMode={setUpdateMode}" in order to turn false back after save in the Updated component
      <>
        <Content>
          <h2>{singlePost.title}</h2>
          <h4>Published at {singlePost.datePosted}</h4>
          <h4>By {singlePost.name}</h4>
          <p>{singlePost.content}</p>
        </Content>    

        <UpdateButton>
          <button onClick={()=> setUpdateMode(true)}>
          Edit
        </button>
        </UpdateButton>
      </>
      }
      <Divider />


      <form onSubmit={commentSubmitHandler}>
        <input onChange= {(e)=>{setName(e.target.value)}} type="text"
        placeholder="Your Name" />

        <TextArea>
          <textarea
            onChange={(e) => {setComment(e.target.value);}}
            type="text"
            placeholder="Start writting your comment here..."
          ></textarea>
        </TextArea>

        <button>Submit</button>
      </form>
      {success && <SuccessMessage>Comment Created</SuccessMessage> }

      
      {/* render is probably trying to map before it is an array. what is this??How it work?? */}
      {postComments && Array.isArray(postComments) && postComments.map((postComment,index)=>{
        return(
          <Comments key={index}>
            <p>{postComment.name}</p>
            <p>{postComment.time}</p>
            <p>{postComment.text}</p>
          </Comments>
        )
      })}

    </Wrapper>
  );
};

export default SinglePost;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80vw;
  align-content: center;
  align-items: center;
  margin-top: 50px;
  margin-left: 50px;

form{
    display: flex;
    flex-direction: column;
}

input{
  /* width:200px; */
  padding: 4px 10px;
  margin-top: 50px;
}

textarea{
    padding: 10px;
    width:40vw;
    height: 50px;
    margin-top: 10px;
}

button{
    margin-top: 10px;
    border: none;
    padding: 8px;
    width: 100px;
    font-size: 15px;
    cursor: pointer;

    :hover {
      background-color: #C89B7D;
    }
}

`;

const Divider = styled.div`
    height: 1px;
    background: rgb(230, 236, 240);
    width: 800px;
    margin: 50px 0px 0px 0px;
`;

const Content = styled.div`
  width:800px;

  h2{
    font-size: 20px;
  }
  
  p{
    margin-top: 20px;
  }
`;
const UpdateButton = styled.div`
    /* justify-content: left;
    align-content: left;
    align-items: left; */
`;
const TextArea = styled.div``;
const SuccessMessage = styled.div``;

const Comments = styled.div``;