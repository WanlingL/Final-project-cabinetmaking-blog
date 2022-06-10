import { useState, useContext } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from 'uuid';
import moment from "moment";
import { UserContext } from "./Context/UserContext";

const CreateNewAlbum =()=>{
    const [inputAlbumTitle, setInputAlbumTitle] = useState("")
    const [success, setSuccess]=useState(false);

    const {userInfo, setUserInfo} = useContext(UserContext);

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
                email: userInfo.data.email,
                datePosted: moment().format("DD-MM-YYYY, hh:mm:ss a"),
                title:inputAlbumTitle
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
            <h2>CreateNewAlbum</h2>
            <form onSubmit={CreateAlbumHandler}>
                <input 
                    onChange ={(e)=>{setInputAlbumTitle(e.target.value)}}
                    type = "text"
                    placeholder="Album Title" />
                
                <button>Create Album</button>
            </form>
            {success && <SuccessMessage>Album Created</SuccessMessage> }
        </Wrapper>
    )
};
export default CreateNewAlbum;

const Wrapper = styled.div`
`
const SuccessMessage = styled.div`

`