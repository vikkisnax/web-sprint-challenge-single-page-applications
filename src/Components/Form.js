import React, {useState, useEffect} from "react";
import Confirmation from "./Confirmation";
import axios from "axios";
import * as yup from 'yup';
import { 
    Link, 
    Route,
    // so submit goes to Confirmation component-- above return
    Redirect 
  } from "react-router-dom";


//CODE 
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


// //SUBMIT BUTTON - control whether or not the form can be submitted if there are errors in form validation (in the useEffect)
const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

// //SERVER ERROR -- uncomment after you make the .catch to let user know there's a server error
const [serverError, setServerError] = useState("");

// //MANAGING STATE for errors. empty unless inline validation (validateInput) updates key/value pair to have error. expects object {}
// do this after useEffect-validate entire form
const [errors, setErrors] = useState({
    name:"",
    size:"",
    topping1: "",
    topping2: "",
    topping3: "",
    topping4: "",
    special:""
})
    //now do inline validation


// //TEMPORARY STATE for API response- not usually used (bc of <pre>) - to display response from API - all the info you submitted - array 
const [post, setPost] = useState(null);


// //make state to store error msgs to display
// //INLINE VALIDATION - after inputChange , schema, validate entire form
    // //validates one key/value pair at a time -- input w/ error
const validateChange = (e) => {
    yup
        .reach(formSchema, e.target.name)
        .validate(
            e.target.type === "checkbox" ? e.target.checked : e.target.value
        )
        //validateChange goes through chained functions above then creates a promise
        .then((valid) => {
            //input matches the schema 
            //resets the error state -- error msg won't show
            setErrors({...errors, [e.target.name]: "" })
            //call validateChange in onChange below
        })
        .catch((err) => {
            //input breaks form schema. we can capture and display error message [0] gives the first error in the error state array
            console.log("err", err);
            setErrors({...errors, [e.target.name]: err.errors[0]})
        })
// console.log(e.target.checked)
// console.log(e)
}

// // ONSUBMIT FUNCTION - button - after inline validation
const formSubmit = (e) => {
    e.preventDefault();
    //post - add later /api/users
    axios
        .post("https://reqres.in/api/orders", order)
        .then((resp) =>{
            console.log(resp);
            // setPost(resp.data); -- don't use bc it returns an empty array above the form's array filled out

            //temporary state for API response
            setPost({
                name: resp.data.name,
                size: resp.data.size,
                topping1: resp.data.topping1,
                topping2: resp.data.topping2,
                topping3: resp.data.topping3,
                topping4: resp.data.topping4,
                special: resp.data.special
            });

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
            // so if u call formSubmit somewhere else, it'll return info above
            return resp.data
        })
        //let user know if there's a server error. look at codesandbox. don't see anything rn 
        .catch((err) => {
            setServerError("There's an error from the server")
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
            e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
        
    // ADD/call LATER - for each error msg 
    validateChange(e); 

    setOrder(newFormState)
};


// // SCHEMA - RULES - Implement Form Validation and Error Messaging
// do this after onChange
    //to see where code stops
    // console.log('here1')
const formSchema = yup.object().shape({
    name: yup.string()
        .required("name must be at least 2 characters").min(2, "name must be at least 2 characters"),
    size: yup.string()
        .oneOf(['Small', 'Medium', 'Large']),
        special: yup.string()
        .required("Message must be at least 1 character").min(1, "'n' if no message"),
    topping1: yup.string(),
    topping2: yup.string(),
    topping3: yup.string(),
    topping4: yup.string(),
});
//to see where the code stops -- if this doesn't show in console
// console.log('here2')



// // VALIDATE ENTIRE FORM - useEffect - when form state changes - compare against formSchema. returns promise. 
useEffect(() => {
    formSchema.isValid(order).then((valid) => {
      console.log('is form valid?', valid)  
      setButtonIsDisabled(!valid)
    })
}, [order]);


// TO GO TO CONFIRMATION page after you submit form -- do this after you do yup and add a confirmation Route path to App 
// 'push to' lets you go back to /pizza url
// you're also passing the 'post' state with the filled out form to Confirmation
if (post) {
    return <Redirect push to={{ pathname: "/confirmation", state: post}}  />
}



  return (
    //add onSubmit after inline validation
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
            {/* error msg after inline validation -- errors.name..... */}
            {errors.name.length > 0 ? (<p className="error">{errors.name}</p>) : null}
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
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
            </select>
            {/* error msg errors.name..... */}
            {errors.size.length > 0 ? (<p className="error">{errors.size}</p>) : null}
        </label>
        </div>


        {/* 3 Checkboxes */}
        <div className="topping1-check">
        <label htmlFor="topping1-check">
            {/* edit spacing */}
            Optional Toppings
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
            {errors.topping1.length > 0 ? (<p className="error">{errors.topping1}</p>) : null}
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
            {errors.topping2.length > 0 ? (<p className="error">{errors.topping2}</p>) : null}
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
            {errors.topping3.length > 0 ? (<p className="error">{errors.topping3}</p>) : null}
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
            {errors.topping4.length > 0 ? (<p className="error">{errors.topping4}</p>) : null}
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
            {errors.special.length > 0 ? (<p className="error">{errors.special}</p>) : null}
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
        {/* if post is true (if I get info typed into form back from the API), then it'll do the next part (show the info on the screen)*/}
        {/* wont show bc we redirect to Confirmation component, so we'll give Confirmation access to the form data in 'post' state */}
        {post && (
            <pre>{JSON.stringify(post, null, 2)}</pre>
        )}
    </form>
  );
};
export default Form;