// import styled from "styled-components";
// import { useState, useEffect, useContext } from "react";
// import { UserContext } from "./Context/UserContext";
// import { useNavigate } from "react-router-dom";
// import {LoginButton, LogoutButton} from "../utility"
// import { useAuth0 } from "@auth0/auth0-react";

// const Signin =()=>{
//     const { isLoading } = useAuth0();

//     const {user, setUser} = useContext(UserContext);
//     const {name, setName} = useContext(UserContext);
//     const {email,setEmail} = useContext(UserContext);
//     const [submitStatus, setSubmitStatus] = useState("idle");
//     const [warningMessage, setWarningMessage] = useState("");
//     const [displayWarning, setDisplayWarning] = useState(false);

//     const navigate = useNavigate();

//     const singInSubmit = (e) =>{
//         e.preventDefault();
        
//         fetch('/api/signin',{
//             method:"POST",
//             headers:{
//                 "Content-Type":"application/json"
//             },
//             body: JSON.stringify({
//                 status: user,
//             }),
//         })
//         .then((response) => response.json())
//         .then((data)=>{
//             // console.log("data in Signin", data)
//             // console.log("data.data in Signin", data.data)
//                 setUser(data.data)
//                 if(data.status === 200){
//                     navigate('/') //check App.js., redirect back the homepage is "/"
//                 }
//         }) 
//     };



//     const handleName =(e) =>{
//         if (e.target.value === "" || /^[a-z A-ZÀ-ÿ]*$/.test(e.target.value)){
//             //this is a valid name
//             setName(e.target.value) 
//         }
//     };

//     const handleEmail =(e)=>{
//         const isEmailValid = new RegExp(/([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{1,61}[0-9A-Za-z])?)+/);

//         let result = isEmailValid.test(e.target.value);
//             setEmail(e.target.value);
    
//         if(e.target.valuet === "" || result){
//             // console.log("email",email)
//             setDisplayWarning(false)
//             setWarningMessage("");//remove the message if is false

//         } else{
//             setDisplayWarning(true)
//             setWarningMessage("Please enter valid email address");
//         }
//     };

//     if (isLoading) {
//         return <div>Loading ...</div>;
//       }
      
//     return(
//         <>
//         {submitStatus ? (
        
//             <Wrapper>
//             <h2>Signin</h2>

//             <form onSubmit={singInSubmit}>
//                 <label htmlFor="name">Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Name"
//                         required
//                         value={name}
//                         onChange={(e)=>handleName(e)}
//                     />

//                     <label htmlFor="email">Email</label>
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="email@email.com"
//                         required
//                         value={email}
//                         onChange={(e)=>handleEmail(e)}
//                     />
//                     {displayWarning &&
//                         <p>*{warningMessage}</p>
//                     }
//                     {/* <button type="submit">Login</button> */}
//                     <LoginButton type="submit"/>
//                     <LogoutButton type="submit"/>
//             </form>

//             </Wrapper>
//         ) : (<CircularProgress />)}
//         </>
//     )
// };

// export default Signin;

// const Wrapper=styled.div`
//     margin-top: 50px;
//     display: flex;
//     flex-direction: column;
//     align-items: center;

// h2{
//     font-size: 20px;
//     font-weight: 600;
// }

// form{
//     display: flex;
//     flex-direction: column;
//     width: 600px;
    
// }

// label{
//     margin-top: 20px;
//     text-align: left;
//     font-size: 15px;
//     gap:10px
// }

// input{
// padding: 8px;
// margin-top: 5px;
// border: 1px solid #f2f2f2;
// }

// p{
//     margin-top: 8px;
//     font-size: 12px;
//     color:red;
// }

// button{
//     margin-top: 20px;
//     border: none;
//     padding: 5px;
//     width: 80px;
//     cursor: pointer;
// }

// `
