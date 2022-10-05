import './App.css';
import { useState } from 'react';

//need to do all the operator buttons,
//and fix when a new digit is added after AC button
//remember after the equals sign has been pressed you want to be able to update the previous calculation
function App(){
    const[currentCalculation, setCurrentCalculation] = useState("")
    const[previousCalculation, setPreviousCalculation] = useState("")

    const Addigits = (newDigit) => {
        setCurrentCalculation(currentCalculation + newDigit);
    }

    const clear = () => {
        setCurrentCalculation(0);
    }

    const deleteLastDigit = () => {
        setCurrentCalculation(currentCalculation.slice(0, -1))
    }

    return (
        <div className="calculator"> 
            <div className="outputPanel">
                <div className="previousCalculation">{previousCalculation || null}</div>
                <div className="currentCalculation">{currentCalculation || "0"}</div> 
            </div>
            <button className="largerButtons" onClick={() => clear()}>AC</button>
            <button onClick={() => deleteLastDigit()}>DEL</button>
            <button className="operators">÷</button>
            <button onClick={() => Addigits('7')}>7</button>
            <button onClick={() => Addigits('8')}>8</button>
            <button onClick={() => Addigits('9')}>9</button>
            <button className="operators">×</button>
            <button onClick={() => Addigits('4')}>4</button>
            <button onClick={() => Addigits('5')}>5</button>
            <button onClick={() => Addigits('6')}>6</button>
            <button className="operators">-</button>
            <button onClick={() => Addigits("1")}>1</button>
            <button onClick={() => Addigits('2')}>2</button>
            <button onClick={() => Addigits('3')}>3</button>
            <button className="operators">+</button>
            <button className="largerButtons" onClick={() => Addigits('0')}>0</button>
            <button onClick={() => Addigits('.')}>.</button>
            <button className="operators">=</button>
        </div>
    )
}

export default App