import React, { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [baseAmount, setBaseAmount] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(0);
  const [tipValue, setTipValue] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [people, setPeople] = useState(2);
  const [tipPerPerson, setTipPerPerson] = useState(0);

  const handleBaseAmount = (event) => {
    const value = parseInt(event.target.value);

    if (value === '' || isNaN(value)) {
      setBaseAmount(0)
    } else {
      setBaseAmount(value);
    }
  }

  const handleTipSlider = (event) => {
    const value = parseInt(event.target.value);
    setTipPercentage(value);
  }

  const handlePersonSlider = (event) => {
    const value = parseInt(event.target.value);
    setPeople(value);
  }

  const calculateTipPerPerson = () => {
    const tipPerPerson = (tipValue / people).toFixed(2);
    setTipPerPerson(tipPerPerson);
    console.log(tipPerPerson);
  }

  const calculateTotalAmount = () => {
    const tipAsDecimal = tipPercentage / 100;
    const tip = parseFloat((baseAmount * tipAsDecimal).toFixed(2));
    setTipValue(tip);

    const totalAmount = (baseAmount + tip).toFixed(2);
    setTotalAmount(totalAmount);
  }

  useEffect(() => {
    calculateTotalAmount();
    calculateTipPerPerson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseAmount, tipPercentage]);

  useEffect(() => {
    calculateTipPerPerson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [people, totalAmount])

  return (
    <div className="App home">
      <h1 className="home__title">Tip Calculator</h1>
      <div className="home__tip-calculator">
        <div className="home__tip-calculator-settings">
          <div className="category home__base-amount">
            <p>Base Amount:</p>
            <input
              className="home__tip-calculator__number-input"
              type="number"
              onChange={handleBaseAmount}
              value={baseAmount}
              id="baseAmount"
              name="baseAmount"
              min={0} max={100}
            />
          </div>
          <div className="category home__tip-calculator__slider">
            <input
              type="range"
              min="0"
              max="100"
              defaultValue={tipPercentage}
              className="home__tip-calculator__slider-meter"
              onInput={handleTipSlider}
              id="myRange" />
            <p className="home__tip-calculator__slider-percentage">Tip percentage: {tipPercentage}%</p>
          </div>
          <div className="category home__tip-calculator__people">
            <input
              type="range"
              min="0"
              max="10"
              defaultValue={people}
              className="home__tip-calculator__slider-meter"
              onInput={handlePersonSlider}
              id="peopleSlider" />
            <p className="home__tip-calculator__slider-percentage">Amount of people: {people}</p>
          </div>
        </div>
        <hr />
        <div className="home__tip-calculator-results">
          <div className="category home__tip-calculator__results-tip-amount">
            <p>Tip Value: $ {tipValue}</p>
          </div>
          <div className="category home__tip-calculator__results-tip-amount">
            <p>Tip per person: $ {tipPerPerson}</p>
          </div>
          <div className="category home__tip-calculator__results-total-bill-with-tip">
            <p>Total Amount: $ {totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
