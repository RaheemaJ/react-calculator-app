import './App.css'

function App(){
    return (
        <div className="calculatorGrid"> 
            <div className="outputBox">
                <div className="previousValue"></div>
                <div className="currentValue"></div>
            </div>
            <button className="largerButtons topRow">AC</button>
            <button className="topRow">DEL</button>
            <button className="operators">÷</button>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button className="operators">×</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button className="operators">-</button>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button className="operators">+</button>
            <button className="largerButtons">0</button>
            <button>.</button>
            <button className="operators">=</button>
        
        </div>
    )
}

export default App