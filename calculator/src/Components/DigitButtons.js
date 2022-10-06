

export default function digitButton( dispatch, digit){
    return <button onClick={() => dispatch( {type: ACTIONS.ADD_DIGIT, payload: {digit}} )}>{digit}</button>
    //this has returned a button that displays the digit that will be pressed, and when it is clicked, we will call dispatch
}


 