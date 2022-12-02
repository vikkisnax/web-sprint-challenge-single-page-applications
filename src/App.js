import React, {useState} from "react";
import axios from "axios";
import Home from "./Components/Home";
import Form from "./Components/Form";
import Confirmation from "./Components/Confirmation";
import { 
  Link, 
  Switch, 
  Route 
} from "react-router-dom";
//styles
import styled from "styled-components";


// STYLES - nav
const Nav = styled.nav`
  display:flex;
  justify-content: space-between;
  margin: 0px 50px;
`
const FontType = styled.h2`
color: #2D3E50;
  font-family: 'Avenir';
  line-height: 90px;
`
const LinkButton = styled.button`
  margin: 20px;
  border: solid 2px;
  border-radius: 5px;
	color: #2D3E50;
  font-family: 'Avenir';
	font-weight: bold;
  height: 50px;
  text-align: center;
  width: 100px;
`
// margin spaces the buttons - good link below


const App = () => {
  return (
  <div className="App">
    <Nav> 
      <FontType className="food-app-header">
        Cozy Foodie
      </FontType>

      <div className="nav-links">
        <Link to="/">
          <LinkButton type="button">
            Home
          </LinkButton>
        </Link>
        <Link to="/pizza">
          <LinkButton type="button">
            Pizza?
          </LinkButton>
        </Link>
      </div>
    </Nav>

    <Switch>
      {/* add confirmation after you did everything else except style site */}
      <Route path="/confirmation" render={() => 
          <Confirmation />}/>
      <Route path="/pizza" render= {(props) => 
        <Form history={props.history} />
      } />
      <Route path="/" component= {Home} />
    </Switch>

  </div>
  );
};
export default App;



//margin link https://blog.hubspot.com/website/css-margin-vs-padding#:~:text=In%20CSS%2C%20a%20margin%20is,the%20space%20inside%20an%20element.



