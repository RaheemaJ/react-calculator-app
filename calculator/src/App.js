import './App.css';
import { useState } from 'react';

/*
 when cleaning up code and sorting redux, maybe need to move all these functions 
 into components folder and turn them into function components
 */
//should i create a test for this??
//add +/- button

function App(){
    const[currentCalculation, setCurrentCalculation] = useState('')
    const[previousCalculation, setPreviousCalculation] = useState('')
    const operators = ['-', '+', '÷', '×', '%',];
    let expression = '';

    const clear = () => {
        setCurrentCalculation(0);
        setPreviousCalculation(0);
    }

    const deleteLastDigit = () => {
        setCurrentCalculation(currentCalculation.slice(0, -1))
    }
  
    /*
    code functionality idea for +/- button
    const changeSign = () => {
        parseInt(currentCalculation) < 0 ? setCurrentCalculation(-Math.abs(currentCalculation)) : setCurrentCalculation(Math.abs(currentCalculation))
    }*/
    const addDigits = (newDigit) => {
        if(currentCalculation === 0 || previousCalculation.includes('=')){
            setPreviousCalculation(' ')
            setCurrentCalculation(newDigit);
        } 
        else if(currentCalculation.includes('.') && newDigit==='.'){
            return;
        }
        /*else if(currentCalculation === 0 && newDigit==='.'){
            setCurrentCalculation('0' + newDigit);
        }*///only use this if 0 doesnt add before decimal
        else{
            setCurrentCalculation(currentCalculation + newDigit);
        }
    }

    /*this checks if the new digit entered is an operatio and if it is, 
    puts the old digit and the operator into the previousCalculation 
    and then zeros the current calc
    */
    const addOperator = (newDigit) => {
        if (operators.includes(newDigit)) {
            setPreviousCalculation(currentCalculation + ' ' + newDigit);
            setCurrentCalculation(' ');
        }
    }
    /*this sets the previous calcuation to our full expression*/
    const onEquals = () => {
        expression = previousCalculation + ' ' + currentCalculation + ' = ';
        if(expression.includes('÷')){
            setCurrentCalculation(previousCalculation.slice(0, -1)/currentCalculation);
        }
        else if(expression.includes('×')){
            setCurrentCalculation(previousCalculation.slice(0, -1)*currentCalculation)
        }
        else if(expression.includes('+')){
            setCurrentCalculation(parseFloat(previousCalculation.slice(0, -1))+parseFloat(currentCalculation))
        }
        else if(expression.includes('-')){
            setCurrentCalculation(previousCalculation.slice(0, -1)-currentCalculation)
        }
        else if(expression.includes('%')){
            setCurrentCalculation(previousCalculation.slice(0, -1)%currentCalculation)
        }
        setPreviousCalculation(expression);
    }

    return (
        <div className="calculator"> 
            <div className="outputPanel">
                <div className="previousCalculation">{previousCalculation || null}</div>
                <div className="currentCalculation">{currentCalculation || "0"}</div> 
            </div>
            <button onClick={() => clear()}>AC</button>
            <button onClick={() => deleteLastDigit()}>DEL</button>
            <button onClick={() => addOperator('%')}>%</button>
            <button onClick={() => addOperator('÷')} className="operators">÷</button>
            <button onClick={() => addDigits('7')}>7</button>
            <button onClick={() => addDigits('8')}>8</button>
            <button onClick={() => addDigits('9')}>9</button>
            <button onClick={() => addOperator('×')} className="operators">×</button>
            <button onClick={() => addDigits('4')}>4</button>
            <button onClick={() => addDigits('5')}>5</button>
            <button onClick={() => addDigits('6')}>6</button>
            <button onClick={() => addOperator('-')} className="operators">-</button>
            <button onClick={() => addDigits('1')}>1</button>
            <button onClick={() => addDigits('2')}>2</button>
            <button onClick={() => addDigits('3')}>3</button>
            <button onClick={() => addOperator('+')} className="operators">+</button>
            <button className="largerButtons" onClick={() => addDigits('0')}>0</button>
            <button onClick={() => addDigits('.')}>.</button>
            <button onClick={() => onEquals()} className="operators">=</button>
        </div>
    )
}

export default App