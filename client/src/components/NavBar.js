import styled from "styled-components";
import { Link } from "react-router-dom";
import { LoginButton, LogoutButton, Profile } from "../utility";
import { useContext } from "react";
import { UserContext } from "./Context/UserContext";
import { useAuth0 } from "@auth0/auth0-react";



const NavBar = () => {
  const { isLoading, user, isAuthenticated } = useAuth0();
  const { userInfo, setUserInfo } = useContext(UserContext);


  return (
    <Wrapper>
      <ul>
        <NavButton>
          <li>
            <Link to="/">Home</Link>
          </li>
        </NavButton>

        <NavButton>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
        </NavButton>

        <NavButton>
          <li>
            <Link to="/album">Album</Link>
          </li>
        </NavButton>

        <NavButton>
          {isAuthenticated && user.email === "wanlingliao628@gmail.com" &&
            <li>
              <Link to="/create-new-post">Create Post</Link>
            </li>
          }
        </NavButton>

        <NavButton>
          <li>
            <AuthButtons>
              {userInfo && 
                <Greeting>
                  <p>Hello </p>
                  <p><Profile /></p>
                </Greeting>
              }

                <LoginButton type="submit" />
                <LogoutButton type="submit" />  
            </AuthButtons>
            
          </li>
        </NavButton>
      </ul>
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled.div`
  background-color: #ded5ca;
  height: 45px;
  position: relative;

  ul {
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    margin-left: 100px;
  }

  a {
    text-decoration: none;
    color: #6F675C;
    font-size: 18px;
  
    :hover {
      color: #C89B7D;
    } 
  }
`;
const NavButton = styled.div`
  margin-top: 12px;
  margin-right: 20px;
  font-size: 16px;
  cursor: pointer;
`;

const AuthButtons = styled.div`
    display: flex;
    flex-direction: row;
    position: absolute;
    right:100px;
    top:8px;
`
const Greeting = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  p{
    margin-right: 5px;
    font-size: 18px;
    color: #6F675C;
  }
`
