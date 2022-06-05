import styled from "styled-components";
import { FiPlusCircle } from "react-icons/fi";
import tree from "../assets/tree.jpg";

const CreateNewPost =()=>{

    return(
        <Wrapper>
            <img src={tree} />
            <form>
                <InputGroup>
                    <input type="file"></input>
                    <input type = "text" placeholder="Title"></input>
                </InputGroup>

                <TextArea>
                    <textarea ype = "text" placeholder="Start writting here..."></textarea>
                </TextArea>
                <button>Submit</button>
            </form>
        </Wrapper>
    )
};

export default CreateNewPost;

const Wrapper=styled.div`
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
    padding: 5px;
    width: 80px;
    cursor: pointer;
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