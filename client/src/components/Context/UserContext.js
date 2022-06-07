import  { createContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


export const UserContext = createContext();

export const UserProvider = ({children}) =>{

    const [userInfo, setUserInfo] = useState(null);
    const {user, isAuthenticated} = useAuth0()

    const [posts, setPosts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // const {id} = useParams();

    //get user-----------------------------------------
    useEffect(() => {
        if(isAuthenticated){
            //fetch, only if user is login
            //Optional chaining (?.)
            fetch(`/api/signin/${user?.email}`, {
                method:"POST",
                headers:{
                    Accept: "application/json",
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(user)
            })
                .then((response) => response.json())
                .then((data) => {
                    setUserInfo(data)
                    console.log("setUserInfo", data)
                })
                .catch((error) => {
                    console.log(error);
                });               
            console.log("useAuth0 user", user)
        }else{
            setUserInfo(null)
        }
    }, [isAuthenticated]);



    
    

    return(
        <UserContext.Provider value={{
            userInfo,
            setUserInfo,
            posts,
            setPosts,
            isLoaded,
            setIsLoaded,

        }}>{children}</UserContext.Provider>
    )
};