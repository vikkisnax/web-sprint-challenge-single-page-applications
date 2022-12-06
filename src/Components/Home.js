import React from "react";
import { useHistory } from "react-router-dom";
//styles
import styled from "styled-components";



const Home = (props) => {
console.log(props) //shows react router props in console. 

//STYLES - pic and button
//pic
const PizzaDiv = styled.div`
  height:400px;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1627461985459-51600559fffe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80');
  background-size: cover;
`
//button 
const PizzaButton = styled.button`
  margin: 280px;
  border: solid 2px;
  border-radius: 5px;
	color: #2D3E50;
  font-family: 'Avenir';
	font-weight: bold;
  height: 40px;
  text-align: center;
  width: 200px;
`

  const history=useHistory();

  return (
  
    <PizzaDiv id="order-pizza">
       <PizzaButton className="pizza-pic-button" onClick={ ()=> history.push("/pizza", {from: "Home"})}>Build Your Own Pizza</PizzaButton>
    </PizzaDiv>

  );
};
export default Home;


//use this pic?
// https://images.unsplash.com/photo-1622880833523-7cf1c0bd4296?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzJ8fHBpenphfGVufDB8MHwwfHw%3D&auto=format&fit=crop&w=700&q=60



// {/* <div className="home-wrapper">
//       <img
//         className="home-image"
//         src="https://source.unsplash.com/F6-U5fGAOik"
//         alt=""
//       />
//       <button className="home-button" onClick={() => history.push("/")}>Home</button>
//     </div> */}