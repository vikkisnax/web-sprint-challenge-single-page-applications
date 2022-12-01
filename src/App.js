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


const App = () => {

  return (
  <div className="App">
    <nav>
        <h1 className="food-app-header">
          Cozy Foodie
        </h1>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/pizza">Pizza?</Link>
        </div>
        <h5>navigation above</h5>
    </nav>

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
