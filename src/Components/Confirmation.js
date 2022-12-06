import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";


const Confirmation = () => {
  //useHistory hook to see if 'post' state was passed in 
  const history = useHistory();
  console.log('history:', history)

  //in console, look at history that you console logged to make sure the form was sent to this component, go to location and state to see the form state that passed here. right click state, click 'copy property path' and paste it onto here... add in history. on your own tho
  const state = history.location.state;
  console.log('state:', state)
  
  //STYLES
  const PizzaDiv = styled.div`
  height:400px;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1627461985459-51600559fffe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80');
  background-size: cover;
`
const PicText = styled.h1`
color:white;
padding-left:50px;
padding-top:10px;
`

const ListStyle = styled.li`
color:white;
padding-left:50px;
`


  return (
  <div>
    <PizzaDiv className="confirmation">
      <PicText>Congrats! Pizza is on the way!</PicText>
      <div>
        <ListStyle>
          <ul>{state.name}</ul>
          <ul>{state.size}</ul>
          {
            state.bacon && <ul>Bacon</ul>
          }{
            state.pepperoni && <ul>Pepperoni</ul>
          }{
            state.mushrooms && <ul>Mushrooms</ul>
          }{
            state.bellpeppers && <ul>Bellpeppers</ul>
          }
          <ul>Special Message: {state.special}</ul>
          <ul>$10.99</ul>
        </ListStyle>
      </div>
    </PizzaDiv>
</div>
  );
};
export default Confirmation;
