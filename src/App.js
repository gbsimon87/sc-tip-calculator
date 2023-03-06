import React, { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [baseAmount, setBaseAmount] = useState(100);
  const [tipPercentage, setTipPercentage] = useState(15);
  const [totalTip, setTotalTip] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [people, setPeople] = useState(1);
  const [tipPerPerson, setTipPerPerson] = useState(0);
  const [totalPerPerson, setTotalPerPerson] = useState(0);

  const handleBaseAmount = (event) => {
    const value = parseFloat(event.target.value);

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

  const calculateTotalPerPerson = () => {
    const totalPerPerson = (totalAmount / people).toFixed(2);
    if (isFinite(totalPerPerson) === false || isNaN(totalPerPerson)) {
      setTotalPerPerson(0);
    } else {
      setTotalPerPerson(totalPerPerson);
    }
  }

  const calculateTipPerPerson = () => {
    const tipPerPerson = (totalTip / people).toFixed(2);
    if (tipPerPerson === 'Infinity' || isNaN(tipPerPerson)) {
      setTipPerPerson(0);
    } else {
      setTipPerPerson(tipPerPerson);
    }
  }

  const calculateTotalAmount = () => {
    const tipAsDecimal = tipPercentage / 100;
    const tip = parseFloat((baseAmount * tipAsDecimal).toFixed(2));
    setTotalTip(tip);

    const totalAmount = (baseAmount + tip).toFixed(2);
    setTotalAmount(totalAmount);
  }

  useEffect(() => {
    calculateTotalAmount();
    calculateTipPerPerson();
    calculateTotalPerPerson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseAmount, tipPercentage]);

  useEffect(() => {
    calculateTipPerPerson();
    calculateTotalPerPerson();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [people, totalAmount])

  return (
    <div className="App home">
      <h1 className="home__title">Tipster</h1>
      <div className="home__tip-calculator">
        <div className="home__tip-calculator-settings">
          <div className="category home__base-amount">
            <p>Base Amount:</p>
            <input
              className="home__tip-calculator__number-input"
              type="number"
              onChange={handleBaseAmount}
              value={baseAmount === 0 ? "" : baseAmount}
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
            <div>
              <p className="home__tip-calculator__slider-percentage">Tip percentage:</p>
              <p>{tipPercentage}%</p>
            </div>
          </div>
          <div className="category home__tip-calculator__people">
            <input
              type="range"
              min="0"
              max="20"
              defaultValue={people}
              className="home__tip-calculator__slider-meter"
              onInput={handlePersonSlider}
              id="peopleSlider" />
            <div>
              <p className="home__tip-calculator__slider-percentage">Amount of people: </p>
              <p>{people}</p>
            </div>
          </div>
        </div>
        <hr />
        <div className="home__tip-calculator-results">
          <div className="category home__tip-calculator__results-tip-amount">
            <p>Total Tip: </p>
            <p>${totalTip}</p>
          </div>
          <div className="category home__tip-calculator__results-tip-amount">
            <p>Tip per person:</p>
            <p>${tipPerPerson}</p>
          </div>
          <div className="category home__tip-calculator__results-total-bill-with-tip">
            <p>Total Amount:</p>
            <p>${totalAmount}</p>
          </div>
          <div className="category home__tip-calculator__results-total-bill-per-person">
            <p>Total per person:</p>
            <p>${totalPerPerson}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
