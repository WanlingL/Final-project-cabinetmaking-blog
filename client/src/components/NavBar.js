import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { LoginButton, LogoutButton, Profile } from "../utility";

const NavBar = () => {
  const { isLoading, user } = useAuth0();

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
          <li>
            <Link to="/create-new-post">Create Post</Link>
          </li>
        </NavButton>

        <NavButton>
          <li>
            <LogButtons>
                <LoginButton type="submit" />
                <LogoutButton type="submit" />
                <p><Profile /></p>
            </LogButtons>
            
          </li>
        </NavButton>
      </ul>
    </Wrapper>
  );
};

export default NavBar;

const Wrapper = styled.div`
  background-color: #ded5ca;
  height: 40px;

  ul {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  a {
    text-decoration: none;
    color: #464543;
  }
`;
const NavButton = styled.div`
  margin-top: 12px;
  margin-right: 20px;
  font-size: 16px;
  cursor: pointer;
`;

const LogButtons = styled.div`
    display: flex;
    flex-direction: row;
    
p{
    margin-left: 10px;
}
`
