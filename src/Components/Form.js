import React, {useState, useEffect} from "react";
// import Confirmation from "./Confirmation";
import axios from "axios";
import * as yup from 'yup';
import { 
    // so submit goes to Confirmation component-- above return
    Redirect 
  } from "react-router-dom";
import styled from "styled-components";



//STYLES
const PizzaContainer = styled.div`
  box-sizing: border-box;
  width: 50%;
  border: solid antiquewhite 3px;
  margin-left: 300px;
  padding-bottom:100px;
`
const HeadingDiv = styled.div`
  display:block;
`

const PizzaImg=styled.div`
    height:400px;
    width: 100%;
    background-image: url('https://images.unsplash.com/photo-1627461985459-51600559fffe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80');
    background-size: cover;
`

const HeaderH1Text = styled.h1`
    font-family: Avenir, Arial, Helvetica;
    color: cadetblue;
    text-align:center;
    margin:10px;
`

const TitleH5Text = styled.h5`
    font-family: Avenir, Arial, Helvetica;
    color: midnightblue;
    background: antiquewhite;
    padding: 10px;
    margin: 10px 0px;
`

const Spacing = styled.div`
  margin: 10px;
`

const CheckBoxSpace = styled.input`
    margin-right:5px;
`

const SpecialInputBox =styled.input`
    padding: 20px 40px;
`

// button style
const ButtonStyle = styled.button`
    border: solid 2px;
    border-radius: 5px;
    color: #2D3E50;
    font-family: 'Avenir';
    font-weight: bold;
    height: 40px;
    text-align: center;
    width: 200px;    
    margin: 10px;
`



//CODE 
const Form = (props) => {
// console.log(props)
const [order, setOrder] = useState([
    {
      name:"",
      size:"",
      baon: false,
      pepperoni: false,
      mushrooms: false,
      bellpeppers: false,
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
    bacon: "",
    pepperoni: "",
    mushrooms: "",
    bellpeppers: "",
    special:""
}) //now do inline validation


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
                bacon: resp.data.bacon,
                pepperoni: resp.data.pepperoni,
                mushrooms: resp.data.mushrooms,
                bellpeppers: resp.data.bellpeppers,
                special: resp.data.special
            });

            //clears form after submit
            setOrder({
                name:"",
                // dropdown
                size:"",
                // checkbox
                bacon: false,
                pepperoni: false,
                mushrooms: false,
                bellpeppers: false,
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
    bacon: yup.string(),
    pepperoni: yup.string(),
    mushrooms: yup.string(),
    bellpeppers: yup.string(),
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
    // <PizzaContainer>
    <PizzaContainer id="pizza-form" >
        <HeadingDiv>
            <HeaderH1Text>Build Your Own Pizza</HeaderH1Text>
            {/* for pic */}
            <PizzaImg></PizzaImg>
        </HeadingDiv>
        <TitleH5Text>Name</TitleH5Text>
        <Spacing htmlFor="name-input">
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
        </Spacing>

        {/* dropdown */}
        <div className="size-dropdown">
            <TitleH5Text>Size</TitleH5Text>
            <Spacing htmlFor="size-dropdown">
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
            </Spacing>
        </div>


        {/* 3 Checkboxes */}
        <div className="bacon-check">
            <TitleH5Text>Optional Toppings</TitleH5Text>
            <Spacing htmlFor="bacon-check">
                <CheckBoxSpace
                    id="bacon-check"
                    type="checkbox"
                    name="bacon"
                    checked={order.bacon}
                        // ADD
                    onChange={inputChange}
                        // cypress 
                    // data-cy="" 
                />
                Bacon
                {/* error msg errors.name..... */}
                {errors.bacon.length > 0 ? (<p className="error">{errors.bacon}</p>) : null}
            </Spacing>
        </div>

        <div className="pepperoni-check">
        <Spacing htmlFor="pepperoni-check">
            <CheckBoxSpace
                id="pepperoni-check"
                type="checkbox"
                name="pepperoni"
                checked={order.pepperoni}
                    // ADD
                onChange={inputChange}
                    // cypress 
                // data-cy="" 
            />
            Pepperoni
            {/* error msg errors.name..... */}
            {errors.pepperoni.length > 0 ? (<p className="error">{errors.pepperoni}</p>) : null}
        </Spacing>
        </div>

        <div className="mushrooms-check">
        <Spacing htmlFor="mushrooms-check">
            <CheckBoxSpace
                id="mushrooms-check"
                type="checkbox"
                name="mushrooms"
                checked={order.mushrooms}
                    // ADD
                onChange={inputChange}
                    // cypress 
                // data-cy="" 
            />
            Mushrooms
            {/* error msg errors.name..... */}
            {errors.mushrooms.length > 0 ? (<p className="error">{errors.mushrooms}</p>) : null}
        </Spacing>
        </div>

        <div className="bellpeppers-check">
        <Spacing htmlFor="bellpeppers-check">
            <CheckBoxSpace
                id="bellpeppers-check"
                type="checkbox"
                name="bellpeppers"
                checked={order.bellpeppers}
                    // ADD
                onChange={inputChange}
                    // cypress 
                // data-cy="" 
            />
            Bellpeppers
            {/* error msg errors.name..... */}
            {errors.bellpeppers.length > 0 ? (<p className="error">{errors.bellpeppers}</p>) : null}
        </Spacing>
        </div>

        <div className="special-text">
            <TitleH5Text>Special Request </TitleH5Text>
            *Required
            <Spacing htmlFor="special-text">
                <SpecialInputBox
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
            </Spacing>
            
        </div>

        {/*  SUBMIT BUTTON? */}

        <ButtonStyle 
            id="order-button"
            type="button" 
            // instead of using 'value'
            disabled={buttonIsDisabled}
            onClick={formSubmit}
        >
            Add to Order $10.99
        </ButtonStyle>

        {/* add <pre>.... code here for last part. this updates info from the server that you typed into the form and puts the array below the form after you submit. doesn't store multiple form submissions */}
        {/* if post is true (if I get info typed into form back from the API), then it'll do the next part (show the info on the screen)*/}
        {/* wont show bc (above) we redirect to Confirmation component after we submit, so we'll give Confirmation access to the form data in 'post' state */}
        {post && (
            <pre>{JSON.stringify(post, null, 2)}</pre>
        )}
    </PizzaContainer>
// </PizzaContainer>
  );
};
export default Form;