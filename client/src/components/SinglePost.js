import styled from "styled-components";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import UpdatePost from "./UpdatePost";
import { useAuth0 } from "@auth0/auth0-react";

const SinglePost = () => {
  const { postId } = useParams();
  const {isAuthenticated, user}=useAuth0()

  const [singlePost, setSinglePost] = useState({});
  const [postComments, setPostComments] = useState({})
  const [name, setName] = useState("")
  const [comment, setComment] = useState("");
  const [success, setSuccess] = useState(false);
  const [updatedMode, setUpdateMode] = useState(false)
  const [newComment, setNewComments] = useState(false);

  //disable to post anything without content
  let disabled= false;
  if(name.length===0 || comment ===0){
    disabled = true;
  }

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
  }, [newComment]);


  //submit comment
  const commentSubmitHandler = (e) => {
    e.preventDefault();
    setNewComments(!newComment) //see the latest comment
    
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
          <p>{singlePost.content}</p>
        </Content> 

        {isAuthenticated && user.email === "wanlingliao628@gmail.com" &&
          <UpdateButton>
            <button onClick={()=> setUpdateMode(true)}>
            Edit
          </button>
          </UpdateButton>
        } 
      </>
      }
      <Divider />

      <Container>
        {!updatedMode && 
          <>
            <h2>Leave your comments:</h2>
            <form onSubmit={commentSubmitHandler}>
              <input onChange= {(e)=>{setName(e.target.value)}} type="text"
              placeholder="Your Name" />

                <textarea
                  onChange={(e) => {setComment(e.target.value);}}
                  type="text"
                  placeholder="Start writting your comment here..."
                ></textarea>
              
              <button disabled={disabled}>Submit</button>
            </form>
            {success && <SuccessMessage>Comment Created</SuccessMessage> }

            
            <h3>Comments:</h3>
            {/* render is trying to map before it is an array. this way can solved xx.map is not a function issue*/}
            {postComments && Array.isArray(postComments) && postComments.map((postComment,index)=>{
              return(
                <Comments key={index}>
                  <h2>{postComment.name}</h2>
                  <h4>{postComment.time}</h4>
                  <p>{postComment.text}</p>
                </Comments>
              )
            })}
          </>
        }
      </Container>
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
  padding: 4px 10px;
  margin-top: 15px;
}

textarea{
    padding: 10px;
    width:40vw;
    height: 50px;
    margin-top: 10px;
}

button{
    border-radius: 5px;
    margin-top: 8px;
    border: none;
    padding: 8px;
    width: 100px;
    font-size: 15px;
    color: #6F675C;
    cursor: pointer;

    :hover {
      background-color: #C89B7D;
      color:#f2f2f2;
    }
}
`;

const Content = styled.div`
  width:800px;
  color: #6F675C;

  h2{
    color:#464543;
    font-size: 20px;
    font-weight: 600;
  }

  h4{
    font-size: 12px;
    margin-top: 5px;
  }
  
  p{
    margin-top: 20px;
    line-height: 1.3;
  }
`;

const Divider = styled.div`
    height: 1px;
    background: rgb(230, 236, 240);
    width: 800px;
    margin: 50px 0px 0px 0px;
`;

const UpdateButton = styled.div`
    /* align-self: flex-end; */
`;

const Container = styled.div`
  color: #6F675C; 

  h2{
    margin-top: 50px;
  }

  h3{
    margin-top: 20px;
  }

  button{
    align-items: flex-end;
    background-color: #F7E8D8;
  }
`;

const SuccessMessage = styled.div`
  margin-top: 10px;
  color:#C89B7D;
`;

const Comments = styled.div`
  color: #6F675C;
  margin-top: 20px;

h3{
  color:#464543;
  font-size: 15px;
  font-weight: 600;
}

h2{
  margin-top: 10px;
  font-size: 15px;
}

h4{
    font-size: 10px;
    margin-top: 5px;
    border-bottom: 1px solid #DED5CA;
    padding-bottom: 3px;
  }

p{
  padding-top: 10px;
  font-size: 15px;
  margin-bottom: 10px;
}
`;