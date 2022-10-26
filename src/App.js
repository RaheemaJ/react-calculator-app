import './App.css';
import { useReducer } from 'react';
import DigitButton from './Components/DigitButtons';
import OperatorButton from './Components/OperatorButtons'


/*
eveerything works except for decimal poiunt is being weird

 */
//should i create a test for this??
const operators = ['-', '+', '÷', '×', '%'];
let expression = '';
let newNum = '';


export const ACTIONS = {
    CLEAR: 'clear',
    CHANGE_SIGN: 'change-sign',
    ADD_DIGIT: 'add_digit',
    ADD_OPERATOR: 'add_operator',
    EQUALS: 'equals'
}

function reducer(state, {type, payload}) {
    switch(type) {
        case ACTIONS.CLEAR: 
            return {
                currentCalculation: `${'0'}`,
                previousCalculation: `${' '}`
            }
        case ACTIONS.CHANGE_SIGN: 
            if(state.currentCalculation ==='0') {
                return state
            }
            else {
                newNum = (0-state.currentCalculation).toString()
                return {
                    ...state,
                    currentCalculation: `${newNum}`
                }
            }
        case ACTIONS.ADD_DIGIT: 
            if((state.currentCalculation === '0' && payload.digit !== '.') || state.previousCalculation.includes('=')) { 
                //this is possible causing issues, some issues with decimals and zeros on the second half od the operation
                return {
                    previousCalculation: `${' '}`,
                    currentCalculation: `${payload.digit}`
                }
            }
            else if(state.currentCalculation.includes('.') && payload.digit==='.') {
                return state;
            }
            else if((state.currentCalculation === ' ') && payload.digit==='.') {
                return {
                    ...state,
                    currentCalculation: `${'0' + payload.digit}`
                }
            }
            else {
                return {
                    ...state,
                    currentCalculation: `${state.currentCalculation + payload.digit}`
                }
            }
        case ACTIONS.ADD_OPERATOR: 
            if (operators.includes(payload.digit)) {
                return {
                    previousCalculation: `${state.currentCalculation + ' ' + payload.digit}`,
                    currentCalculation: `${' '}`
                }
            }
            break;
        case ACTIONS.EQUALS: 
            if(state.previousCalculation.includes('=') || state.previousCalculation === ' ') { 
                return state
            }
            else {
                expression = state.previousCalculation + ' ' + state.currentCalculation + ' = ';
                if(expression.includes('÷')) {
                    return {
                        currentCalculation: `${state.previousCalculation.slice(0, -1)/state.currentCalculation}`,
                        previousCalculation: `${expression}`
                    }
                }
                else if(expression.includes('×')) {
                    return {
                        currentCalculation: `${state.previousCalculation.slice(0, -1)*state.currentCalculation}`,
                        previousCalculation: `${expression}`
                    }
                }
                else if(expression.includes('+')) {
                    return {
                        currentCalculation: `${parseFloat(state.previousCalculation.slice(0, -1))+parseFloat(state.currentCalculation)}`,
                        previousCalculation: `${expression}`
                    }
                }
                else if(expression.includes('-')) {
                    return {
                        currentCalculation: `${state.previousCalculation.slice(0, -1)-state.currentCalculation}`,
                        previousCalculation: `${expression}`
                    }
                }
                else if(expression.includes('%')) {
                    return {
                        currentCalculation: `${state.previousCalculation.slice(0, -1)%state.currentCalculation}`,
                        previousCalculation: `${expression}`
                    }
                }
                break;
            }
            default:
                return state
    }
}

function App() {
    const initialState = {currentCalculation: '0', previousCalculation: ' '}
    const[{currentCalculation, previousCalculation}, dispatch] = useReducer(reducer, initialState)

    return (
        <div className="calculator"> 
            <div className="outputPanel">
                <div className="previousCalculation">{previousCalculation}</div>
                <div className="currentCalculation">{currentCalculation}</div> 
            </div>
            <button onClick={() => dispatch({type: ACTIONS.CLEAR})} >AC</button>
            <button onClick={() => dispatch({type: ACTIONS.CHANGE_SIGN})} >+/-</button>
            <button onClick={() => dispatch({type: ACTIONS.ADD_OPERATOR, payload: {digit:'%'}})} >%</button>
            <OperatorButton digit='÷' dispatch={dispatch} />
            <DigitButton digit='7' dispatch={dispatch} />
            <DigitButton digit='8' dispatch={dispatch} />
            <DigitButton digit='9' dispatch={dispatch} />
            <OperatorButton digit ='×' dispatch={dispatch} />
            <DigitButton digit='4' dispatch={dispatch} />
            <DigitButton digit='5' dispatch={dispatch} />
            <DigitButton digit='6' dispatch={dispatch} />
            <OperatorButton digit ='-' dispatch={dispatch} />
            <DigitButton digit='1' dispatch={dispatch} />
            <DigitButton digit='2' dispatch={dispatch} />
            <DigitButton digit='3' dispatch={dispatch} />
            <OperatorButton digit='+' dispatch={dispatch} />
            <button digit='0' onClick={() => dispatch({type: ACTIONS.ADD_DIGIT, payload: {digit:'0'}})} className='largerButtons'>0</button>
            <DigitButton digit='.' dispatch={dispatch} />
            <button onClick={() => dispatch({type: ACTIONS.EQUALS})} className="operators">=</button>
        </div>
    )
}

export default App