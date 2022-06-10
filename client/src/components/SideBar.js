import styled from "styled-components";
import about from "../assets/about.jpg"


const SideBar =()=>{

    return(
        <Wrapper>
            <SideBarItems>
                <h2>About Site</h2>
                <img src={about} />
                <p>Cabinet making, also spelled cabinetmaking or "cabinet-making" with a hyphen, is the use of fine woodworking skills to make cabinets and furniture. <br/>Cabinetmaker made furniture like cabinets, chairs, doors, drawers, cupboards, bed frames, tables, and more.</p>
            </SideBarItems>
            
            <SideBarItems>
                <h2>Suggest Shops</h2>
            </SideBarItems>
        </Wrapper>
    )
};

export default SideBar;

const Wrapper=styled.div`
    background-color: #f2f2f2;
    height: 95vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SideBarItems=styled.div`
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

img{
    width:100px;
}

h2{
    border-bottom: 1px solid #8C8A87;
    padding: 10px;
    margin-bottom: 25px;
    color: #8C8A87;
}

p{
    margin-top: 10px;
    padding: 20px;
    line-height: 1.2;
    color: #8C8A87;
}


`