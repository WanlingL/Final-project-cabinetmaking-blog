import styled from "styled-components";
import { Link } from "react-router-dom";

const NavBar =()=>{

    return(
        <Wrapper>
            <ul>
                <NavButton>
                    <li>
                        <Link to ="/">Home</Link>
                    </li>
                </NavButton>

                <NavButton>
                    <li>
                        <Link to ="/blog">Blog</Link>
                    </li>
                </NavButton>

                <NavButton>
                    <li>
                        <Link to ="/create-new-post">Create Post</Link>
                    </li>
                </NavButton>

                <NavButton>
                    <li>
                        <Link to ="/album">Album</Link>
                    </li>
                </NavButton>

                <NavButton>
                    <li>
                        <Link to ="/signin">Signin</Link>
                    </li>
                </NavButton>
            </ul>
        </Wrapper>
    )
};

export default NavBar;

const Wrapper=styled.div`
`

const NavButton=styled.div`
`
