import React, { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [baseAmount, setBaseAmount] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [tipValue, setTipValue] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleBaseAmount = (event) => {
    const value = parseInt(event.target.value);

    if (value === '' || isNaN(value)) {
      setBaseAmount(0)
    } else {
      setBaseAmount(value);
    }
  }

  const handleSliderInput = (event) => {
    const value = parseInt(event.target.value);
    setTipPercentage(value);
  }

  const calculateTotalAmount = () => {
    const tipAsDecimal = tipPercentage / 100;
    const tip = parseFloat((baseAmount * tipAsDecimal).toFixed(2));
    setTipValue(tip);

    const totalAmount = (baseAmount + tip).toFixed(2);
    setTotalAmount(totalAmount);
  }

  useEffect(() => {
    calculateTotalAmount()
  }, [baseAmount, tipPercentage]);

  return (
    <div className="App home">
      <h1 className="home__title">Tip Calculator</h1>
      <div className="home__tip-calculator">
        <div className="category home__base-amount">
          <p>Base Amount:</p>
          {/* <div> */}
          <input className="home__tip-calculator__number-input" type="number" onChange={handleBaseAmount} value={baseAmount} id="baseAmount" name="baseAmount" min={0} max={100} />
          {/* </div> */}
        </div>
        <div className="category home__tip-calculator__slider">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue={tipPercentage}
            className="home__tip-calculator__slider-meter"
            onInput={handleSliderInput}
            id="myRange" />
          <p className="home__tip-calculator__slider-percentage">Tip percentage: {tipPercentage}%</p>
        </div>
        <hr />
        <div className="category home__tip-calculator__results-tip-amount">
          <p>Tip Value: $ {tipValue}</p>
        </div>
        <div className="category home__tip-calculator__results-total-bill-with-tip">
          <p>Total Amount: $ {totalAmount}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
