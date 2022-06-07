import  { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({children}) =>{
    // const [user, setUser] = useState(null);
    // const [name, setName] = useState("");
    // const [email,setEmail] = useState("");
    const [posts, setPosts] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    

    return(
        <UserContext.Provider value={{
            // user,
            // setUser,
            // name,
            // setName,
            // email,
            // setEmail,
            posts,
            setPosts,
            isLoaded,
            setIsLoaded

        }}>{children}</UserContext.Provider>
    )
};