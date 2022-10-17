import {ACTIONS} from '../App'

export default function OperatorButton({dispatch, digit}){
    return (
        <button onClick={() => dispatch( {type: ACTIONS.ADD_OPERATOR, payload: {digit}} )} className="operators">{digit}</button>
        )
}