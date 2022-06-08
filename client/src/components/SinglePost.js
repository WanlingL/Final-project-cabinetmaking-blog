import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import moment from "moment";

const SinglePost = () => {
  const { postId } = useParams();

  const [singlePost, setSinglePost] = useState({});
  const [name, setName] = useState("")
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`/api/get-blog-post/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("data.data",data.data)
        setSinglePost(data.data);
      })
      .catch((error) => {
        console.log("singlePost", error);
      });
  }, []);

  // not able to comment twice in the same post
  const commentSubmitHandler = (e) => {
    e.preventDefault();
    
      fetch("/api/comment-on-post", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: postId,
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
      {singlePost.title}

      <form onSubmit={commentSubmitHandler}>
        <input onChange= {(e)=>{
          setName(e.target.value)
        }} type="text" placeholder="name" />

        <TextArea>
          <textarea
            onChange={(e) => {
              setComment(e.target.value);
            }}
            type="text"
            placeholder="Start writting your comment here..."
          ></textarea>
        </TextArea>
        <button>Submit</button>
      </form>
      {success && <SuccessMessage>Comment Created</SuccessMessage> }

    </Wrapper>
  );
};

export default SinglePost;

const Wrapper = styled.div``;

const TextArea = styled.div``;
const SuccessMessage = styled.div``;
