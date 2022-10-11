import './App.css';
import { useState } from 'react';

/*
 when cleaning up code and sorting redux, maybe need to move all these functions 
 into components folder and turn them into function components

 */
//should i create a test for this??


function App(){
    const[currentCalculation, setCurrentCalculation] = useState('0')
    const[previousCalculation, setPreviousCalculation] = useState('')
    const operators = ['-', '+', '÷', '×', '%'];
    let expression = '';

    //when the AC button is pressed, this will clear past and current calculations
    const clear = () => {
        setCurrentCalculation('0');
        setPreviousCalculation(' ');
    }

    const deleteLastDigit = () => {
        setCurrentCalculation(currentCalculation.slice(0, -1))
    }

    //adds a digit, prevents two .'s in the same expression and restarts calculations when a new digit is pressed and replaces 0 from AC
    const addDigits = (newDigit) => {
        if((currentCalculation === '0' && newDigit !== '.') || previousCalculation.includes('=')){
            setPreviousCalculation(' ')
            setCurrentCalculation(newDigit);
        }
        else if(currentCalculation.includes('.') && newDigit==='.'){
            return;
        }
        else if((currentCalculation === ' ') && newDigit==='.'){
            setCurrentCalculation('0' + newDigit);
        }
        else{
            setCurrentCalculation(currentCalculation + newDigit);
        }
    }

    /*this checks if the new digit entered is an operator and if it is, 
    puts the old digit and the operator into the previousCalculation
     and then zeros the current calc
    */
    const addOperator = (newDigit) => {
        if (operators.includes(newDigit)) {
            setPreviousCalculation(currentCalculation + ' ' + newDigit);
            setCurrentCalculation(' ')
        }
    }
    /* when equals is clicked, sets expression to our full calculation,
     then calculates the value*/
    const onEquals = () => {
        if(previousCalculation.includes('=')){
            return;
        }
        else{
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
    }

    return (
        <div className="calculator"> 
            <div className="outputPanel">
                <div className="previousCalculation">{previousCalculation || null}</div>
                <div className="currentCalculation">{currentCalculation || '0'}</div> 
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
            <button onClick={() => addDigits('0')} className="largerButtons">0</button>
            <button onClick={() => addDigits('.')}>.</button>
            <button onClick={() => onEquals()} className="operators">=</button>
        </div>
    )
}

export default App