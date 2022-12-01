import React from "react";
import { useHistory } from "react-router-dom";


const Confirmation = () => {
  //useHistory hook to see if 'post' state was passed in 
  const history = useHistory();
  console.log('history:', history)

  //in console, look at history that you console logged to make sure the form was sent to this component, go to location and state to see the form state that passed here. right click state, click 'copy property path' and paste it onto here... add in history. on your own tho
  const state = history.location.state;
  console.log('state:', state)
  
  return (
    <div className="confirmation">
      <h1>confirmation component</h1>
      <p>
        {/* do this to show what u want on here -- DO TODAY THEN STYLE SITE */}
        {state.name}
      </p>
    </div>
  );
};
export default Confirmation;