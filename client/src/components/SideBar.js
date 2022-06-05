import styled from "styled-components";
import about from "../assets/about.jpg"


const SideBar =()=>{

    

    return(
        <Wrapper>
            <SideBarItems>
                <h2>About Site</h2>
                <img src={about} />
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna</p>
            </SideBarItems>
            
            <SideBarItems>
                <h3>*Suggest Shops</h3>
            </SideBarItems>
        </Wrapper>
    )
};

export default SideBar;

const Wrapper=styled.div`
    background-color: #f2f2f2;
    height: 95vh;
    flex: 3;
    /* margin: 20px; */
    display: flex;
    flex-direction: column;
    align-items: center;

`

const SideBarItems=styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

h2{
    border-bottom: 1px solid #464543;
    padding: 5px;
    margin-bottom: 10px;
}

img{
    width:100px;
}
`