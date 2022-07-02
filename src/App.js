import { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [baseAmount, setBaseAmount] = useState(50);
  const [tipAmount, setTipAmount] = useState(18);
  const [tipValue, setTipValue] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculateTotalAmount = () => {
    const totalAmount = +(+(baseAmount) + +(tipValue)).toFixed(2);
    setTotalAmount(totalAmount);
  }

  const handleSliderInput = (event) => {
    const sliderValue = +(event.target.value);
    setTipAmount(sliderValue);
    calculateTipValue();
    calculateTotalAmount();
  }

  useEffect(() => {
    const tipAmountAsPercentage = tipAmount / 100;
    let tip = +(baseAmount * tipAmountAsPercentage);
    setTipValue(tip);

    const totalAmount = (baseAmount + tip).toFixed(2);
    // console.log(totalAmount)
    setTotalAmount(totalAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    calculateTipValue();
    calculateTotalAmount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseAmount])


  const calculateTipValue = () => {
    const tipAmountAsPercentage = tipAmount / 100;
    let tip = +(+(baseAmount) * +(tipAmountAsPercentage)).toFixed(2);
    console.log({ baseAmount, tipAmount, tipAmountAsPercentage, tip });
    setTipValue(tip);
  }

  const handleBaseAmount = (event) => {
    setBaseAmount(+(event.target.value));
  }

  return (
    <div className="App home">
      <div className="home__tip-calculator">
        <h1>Tip Calculator</h1>
        <div className="home__initial-amount">
          <div>Intial Amount:</div>
          <div><input type="number" onChange={handleBaseAmount} value={baseAmount} id="baseAmount" name="baseAmount" min="0" max="100" /></div>
        </div>
        <div className="home__tip-calculator__slider">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue={tipAmount}
            className="home__tip-calculator__slider-meter"
            onInput={handleSliderInput}
            id="myRange" />
          <div className="home__tip-calculator__slider-percentage">Tip percentage: {tipAmount}%</div>
        </div>
        <hr />
        <h3>Result</h3>
        <div className="home__tip-calculator__results-tip-amount">
          <div>Tip Value:</div>
          <div>{tipValue}</div>
        </div>
        <div className="home__tip-calculator__results-total-bill-with-tip">
          <div>Total Bill with tip</div>
          <div>{totalAmount}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
