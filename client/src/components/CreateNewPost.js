import styled from "styled-components";
import { FiPlusCircle } from "react-icons/fi";
import tree from "../assets/tree.jpg";
import { useContext, useState } from "react";
import { UserContext } from "./Context/UserContext";
import { v4 as uuidv4 } from 'uuid';

const CreateNewPost =()=>{
    const[inputTitle, setinputTitle] =useState ("");
    const[inputContent, setInputContent] =useState("");
    const[success,setSuccess]=useState(false);

    const postSubmitHandler=(e)=>{
        e.preventDefault();

        fetch("/api/add-post", {
            method:"POST",
            body:JSON.stringify({
                id:uuidv4(),
                imgUrl:"null",
                title:inputTitle,
                content:inputContent
            }),
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json"
            },
        })
        .then((res)=>res.json())
        .then((data)=>{
            if(data.status===200){
                setSuccess(true)
            } else{
                setSuccess(false)
            }
        })
    };


    return(
        <Wrapper>
            <img src={tree} />
            <form onSubmit={postSubmitHandler}>
                <InputGroup>
                    <input type="file"></input>
                    <input onChange={(e)=>{
                        setinputTitle(e.target.value)}}
                        type = "text"
                        placeholder="Title"/>
                </InputGroup>

                <TextArea>
                    <textarea onChange={(e)=>{
                        setInputContent(e.target.value)}}
                        type = "text"
                        placeholder="Start writting here..."></textarea>
                </TextArea>
                <button>Submit</button>
            </form>
            {success && <SuccessMessage>Post Created</SuccessMessage> }
        </Wrapper>
    )
};

export default CreateNewPost;

const Wrapper=styled.div`
    width: 80vw;
    justify-content: center;
    align-content: center;
    align-items: center;
    margin-top: 50px;
    margin-left: 50px;
    
img{
    width: 70vw;
    height: 250px;
    object-fit: cover;
    border-radius: 5px;
}

form{
    display: flex;
    flex-direction: column;
}

textarea{
    padding: 10px;
    width:70vw;
    height: 200px;
}

button{
    margin-top: 20px;
    border: none;
    padding: 10px;
    width: 150px;
    font-size: 18px;
    cursor: pointer;

    :hover {
      background-color: #C89B7D;
    }
}
`
const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 70vw;
`

const TextArea = styled.div`
    margin-top: 20px;
    font-size: 15px;
`

const SuccessMessage = styled.div`
    position: absolute;
    top:50;
    left: 50;
    transform: translate(-50%,50%);
`