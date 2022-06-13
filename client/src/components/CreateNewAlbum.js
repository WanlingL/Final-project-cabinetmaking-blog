import { useState, useContext } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { UserContext } from "./Context/UserContext";
import { useParams } from "react-router-dom";

const CreateNewAlbum =()=>{
    const [inputAlbumTitle, setInputAlbumTitle] = useState("")
    const [success, setSuccess]=useState(false);
    const {userInfo, setUserInfo} = useContext(UserContext);
    const {albumId} = useParams();

    const CreateAlbumHandler=(e)=>{
        e.preventDefault();

        fetch("/api/add-album",{
            method:"POST",
            headers:{
                Accept: "application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                id:uuidv4(),
                // email: userInfo.data.email,
                datePosted: moment().format("DD-MM-YYYY, hh:mm:ss a"),
                title:inputAlbumTitle,
            }),
        })
        .then((response)=>response.json())
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
            <Form onSubmit={CreateAlbumHandler}>
                <input 
                    onChange ={(e)=>{setInputAlbumTitle(e.target.value)}}
                    type = "text"
                    placeholder="Album Title"
                />
                
                <button>Create Album</button>
            </Form>
            {success && <SuccessMessage>Album Created</SuccessMessage> }
        </Wrapper>
    )
};
export default CreateNewAlbum;

const Wrapper = styled.div`
    margin-top: 50px;
    margin-left: 50px;
`

const Form=styled.form`
    display: flex;
    flex-direction: row;

    input{
    width: 400px;
    padding: 3px 10px;
}

    button{
   /* align-self: flex-end; */
    border-radius: 5px;
    margin-top: 15px;
    border: none;
    padding: 10px;
    width: 200px;
    font-size: 18px;
    color: #6F675C;
    cursor: pointer;

    :hover {
      background-color: #C89B7D;
      color:#f2f2f2;
    }
}
`
const SuccessMessage = styled.div`
    margin-top: 10px;
    color:#C89B7D;
`