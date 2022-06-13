import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


//LoginButton------------------------------------------
export const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <button 
        onClick={() => loginWithRedirect()}
        style={{
          marginLeft:"20px", 
          borderStyle:"none", 
          borderRadius: "3px",
          backgroundColor:"#464543",
          padding:"4px 13px",
          color:"#F7E8D8",
          fontSize:"18px",
          cursor: "pointer",
          // "&:hover":{backgroundColor: "#C89B7D"}
        }}
      >
          Log In
      </button>
    )
  );
};

//LogoutButton------------------------------------------
export const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <button 
        onClick={() => logout({ returnTo: window.location.origin })}
        style={{
          marginLeft:"20px", 
          borderStyle:"none", 
          borderRadius: "3px",
          backgroundColor:"#F7E8D8",
          padding:"4px 13px",
          color:"#6F675C",
          fontSize:"18px",
          cursor: "pointer",
          ':hover':{color: "#C89B7D"} ,
        }}
      >
          Log Out
      </button>
    )  
  );
};

//User---------------------------------------------------
export const Profile = () => {
  const { user, isAuthenticated} = useAuth0();

  // if(user){
  //   const { name, email } = user;
  // }

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  return (
    isAuthenticated && (
      <div>
        <h2>{user.given_name}</h2>
        {/* <p>{user.email}</p> */}
        {/* {JSON.stringify(user,null,2)} */}
        {/* <img src={user.picture} alt={user.name} /> */}
        
      </div>
    )
  );
};