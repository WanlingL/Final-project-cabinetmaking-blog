import styled from "styled-components";
import { FiPlusCircle } from "react-icons/fi";
import tree from "../assets/tree.jpg";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { UserContext } from "./Context/UserContext";
import Upload from "./Upload";


const CreateNewPost =()=>{
    const navigate = useNavigate();
    const[inputTitle, setinputTitle] =useState ("");
    const[inputContent, setInputContent] =useState("");
    const[success,setSuccess]=useState(false);
    const [displayWarning, setDisplayWarning] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const {newPost, setNewPost} = useContext(UserContext);

    //disable 0 input
    let disabled= false;
    if(inputTitle.length ===0 || inputContent.length===0){
        disabled = true;
    }

    const postSubmitHandler=(e)=>{
        e.preventDefault();

        fetch("/api/add-post", {
            method:"POST",
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:uuidv4(),
                // user: userInfo.data.given_name,
                // email: userInfo.data.email,
                // imgUrl:"null",
                datePosted: moment().format("DD-MM-YYYY, hh:mm:ss a"),
                title:inputTitle,
                content:inputContent
            }),            
        })
        .then((response)=>response.json())
        .then((data)=>{
            if(data.status===200){
                // navigate("/blog")
                setSuccess(true)
                setNewPost(!newPost)
            } else{
                setSuccess(false)
                setDisplayWarning(true)
                setErrorMessage("Looks like you missing something")
            }
        })
    };

    return(
        <Wrapper>
            <img src={tree} />
            {/* <Upload />         */}

            <form onSubmit={postSubmitHandler}>                           
                <InputGroup>
                    <input onChange={(e)=>{setinputTitle(e.target.value)}}
                        type = "text"
                        placeholder="Title"/>
                </InputGroup>

                <TextArea>
                    <textarea onChange={(e)=>{setInputContent(e.target.value)}}
                        type = "text"
                        placeholder="Start writting here..."></textarea>
                </TextArea>
                {displayWarning && <P>*Warning: {errorMessage}</P>}
                <button disabled={disabled}>Submit</button>
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

input{
    margin-top: 10px;
    padding: 10px;
}

textarea{
    padding: 10px;
    width:70vw;
    height: 200px;
}

button{
   /* align-self: flex-end; */
    border-radius: 5px;
    margin-top: 15px;
    border: none;
    padding: 10px;
    width: 120px;
    font-size: 18px;
    color: #6F675C;
    cursor: pointer;

    :hover {
      background-color: #C89B7D;
      color:#f2f2f2;
    }
};
`
const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    width: 70vw;
`;

const TextArea = styled.div`
    margin-top: 20px;
    font-size: 15px;
`;

const P = styled.p`
  margin-top: 8px;
  font-size: 12px;
  color:red;
`;

const SuccessMessage = styled.div`
    margin-top: 10px;
    color:#C89B7D;
`;