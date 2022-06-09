// import styled from "styled-components";
// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const ViewPost =({title, content}) =>{
//     const [updatedMode, setUpdateMode] = useState(false);
//     const [singlePost, setSinglePost] = useState({});
//     const { postId } = useParams();



//     return(
//         <Wrapper>

// <Content>
//           <h2>{singlePost.title}</h2>
//           <p>{singlePost.content}</p>
//         </Content>    

//         <UpdateButton>
//         <button onClick={()=> setUpdateMode(true)}>
//           Edit
//         </button>
//         </UpdateButton>

//         </Wrapper>
//     )

// };

// export default ViewPost;

// const Wrapper = styled.div`

// `

// const Content = styled.div`
//   h2{
//     font-size: 20px;
//   }
  
//   p{
//     margin-top: 20px;
//   }
// `;
// const UpdateButton = styled.div`
//     /* justify-content: left;
//     align-content: left;
//     align-items: left; */
// `;