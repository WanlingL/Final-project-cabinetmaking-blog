import React from "react";
import { useAuth0 } from "@auth0/auth0-react";


//LoginButton------------------------------------------
export const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <button 
        onClick={() => loginWithRedirect()}>
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
        onClick={() => logout({ returnTo: window.location.origin })}>
          Log Out
      </button>
    )  
  );
};

//User---------------------------------------------------
export const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  return (
    isAuthenticated && (
      <div>
        <h2>{user.name}</h2>
        {JSON.stringify(user,null,2)}
        {/* <img src={user.picture} alt={user.name} /> */}
        {/* <p>{user.email}</p> */}
      </div>
    )
  );
};