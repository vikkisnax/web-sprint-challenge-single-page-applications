import React, {useState} from "react";
// import {
//     Link,
//     Route
// } from 'react-router-dom';
import Confirmation from "./Confirmation";
import axios from "axios";


const Form = (props) => {
// console.log(props)

const [order, setOrder] = useState([
    {
      name:"",
      size:"",
      topping1: false,
      topping2: false,
      topping3: false,
      topping4: false,
      special:""
    }
  ]);


// //submit button - control whether or not the form can be submitted if there are errors in form validation (in the useEffect)
const [buttonIsDisabled, setButtonIsDisabled] = useState(true);



// //server error -- uncomment after you make the .catch to let user know there's a server error
const [serverError, setServerError] = useState("");



// //managing state for errors. empty unless inline validation (validateInput) updates key/value pair to have error. expects object {}



// //temporary state for API response- not usually used (bc of <pre>) - to display response from API - array 
const [post, setPost] = useState([]);



// //make state to store error msgs to display
// //inline validation - after inputChange , schema, validate entire form
    // //validates one key/value pair at a time -- input w/ error



// // ONSUBMIT FUNCTION - button 
const formSubmit = (e) => {
    e.preventDefault();

    //post - add later /api/users
    axios
        .post("https://reqres.in/api/users", order)
        .then((resp) =>{
            //temporary state for API response
            setPost(resp.data);
            //clears form after submit
            setOrder({
                name:"",
                // dropdown
                size:"",
                // checkbox
                topping1: false,
                topping2: false,
                topping3: false,
                topping4: false,
                special:""
            })
        })
        //let user know if there's a server error. look at codesandbox. don't see anything rn 
        .catch((err) => {
            setServerError("There's an error from the server :(")
        })
}



// // ONCHANGE FUNCTION
const inputChange = (e) => {
    //bc passing event asyncronusly - bc of error msg too- read notes
    e.persist();
    
    //clone state, access 'name' key when we access and change its value
    const newFormState = {
        ...order, 
        [e.target.name]: 
            e.target.type === "checkbox" ? e.target.checked : e.target.value};
        
    // ADD LATER - for each error msg 
    // validateChange(e); // for each change in input, do inline validation. event variable.

setOrder(newFormState)
};


// // SCHEMA - RULES - Implement Form Validation and Error Messaging
// do this after onChange











// // VALIDATE ENTIRE FORM - when form state changes - compare against formSchema. returns promise. 



  return (
    //add onSubmit
    <form id="pizza-form" onSubmit={formSubmit}>
        <h1>Build Your Own Pizza</h1>

        <label htmlFor="name-input">
            Name
            <input
                id="name-input"
                type="text"
                name="name"
                // same as state key
                value={order.name} 
                    // ADD
                onChange={inputChange}
                    // cypress 
                // data-cy="" 
            />
            {/* error msg errors.name..... */}
        </label>

        {/* dropdown */}
        <div className="size-dropdown">
        <label htmlFor="size-dropdown">
            Size
            <select
                id="size-dropdown"
                name="size"
                value={order.size}
                // ADD 
                onChange={inputChange}>
                {/* cypress - remove  > above and use it below
                data-cy="" >  */}
            
                <option value="">--- Select Size ---</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
            </select>
            {/* error msg errors.name..... */}
        </label>
        </div>


        {/* 3 Checkboxes */}
        <div className="topping1-check">
        <label htmlFor="topping1-check">
            <input
                id="topping1-check"
                type="checkbox"
                name="topping1"
                checked={order.topping1}
                    // ADD
                onChange={inputChange}
                    // cypress 
                // data-cy="" 
            />
            {/* error msg errors.name..... */}
        </label>
        Bacon
        </div>

        <div className="topping2-check">
        <label htmlFor="topping2-check">
            <input
                id="topping2-check"
                type="checkbox"
                name="topping2"
                checked={order.topping2}
                    // ADD
                onChange={inputChange}
                    // cypress 
                // data-cy="" 
            />
            Pepperoni
            {/* error msg errors.name..... */}
        </label>
        </div>

        <div className="topping3-check">
        <label htmlFor="topping3-check">
            <input
                id="topping3-check"
                type="checkbox"
                name="topping3"
                checked={order.topping3}
                    // ADD
                onChange={inputChange}
                    // cypress 
                // data-cy="" 
            />
            Mushrooms
            {/* error msg errors.name..... */}
        </label>
        </div>

        <div className="topping4-check">
        <label htmlFor="topping4-check">
            <input
                id="topping4-check"
                type="checkbox"
                name="topping4"
                checked={order.topping4}
                    // ADD
                onChange={inputChange}
                    // cypress 
                // data-cy="" 
            />
            Bellpeppers
            {/* error msg errors.name..... */}
        </label>
        </div>

        <div className="special-text">
        <label htmlFor="special-text">
            Special Request
            <input
                id="special-text"
                type="text"
                name="special"
                value={order.special}
                    // ADD
                onChange={inputChange}
                    // cypress 
                // data-cy="" 
            />
            {/* error msg errors.name..... */}
        </label>
        </div>

        {/*  SUBMIT BUTTON? */}

        <button 
        id="order-button"
        type="submit" 
        // instead of using 'value'
        disabled={buttonIsDisabled}>
            Add to Order
        </button>

        {/* add other code here for last part <pre>.... this updates info from the server that you typed into the form below the form after you submit. doesn't store multiple form submissions */}
        {/* <pre>{JSON.stringify(post, null, 2)}</pre> */}
 
    </form>
  );
};
export default Form;