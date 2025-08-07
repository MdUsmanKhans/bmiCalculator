import { useState } from 'react';
import './App.css';

function App() {
  const [weight, setWeight] = useState(0);       // in kilograms
  const [feet, setFeet] = useState(0);           // height (feet part)
  const [inches, setInches] = useState(0);       // height (inches part)
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  const bmiCal = (e) => {
    e.preventDefault();

    if (weight <= 0 || (feet <= 0 && inches <= 0)) {
      alert("Please enter valid weight and height");
      return;
    }

    const totalInches = (Number(feet) * 12) + Number(inches);
    const heightInMeters = totalInches * 0.0254; // convert to meters

    const calculatedBmi = weight / (heightInMeters * heightInMeters);
    const roundedBmi = calculatedBmi.toFixed(1);

    setBmi(roundedBmi);

    if (calculatedBmi < 18.5) {
      setMessage("You are underweight");
    } else if (calculatedBmi < 25) {
      setMessage("Your weight is normal");
    } else if (calculatedBmi < 30) {
      setMessage("You are overweight");
    } else {
      setMessage("You are obese");
    }
  };

  const reload = () => {
    setWeight(0);
    setFeet(0);
    setInches(0);
    setBmi('');
    setMessage('');
  };

  return (
    <div className="App">
      <div className="container">
        <h2>BMI Calculator</h2>
        <form onSubmit={bmiCal}>
          <div>
            <label>Weight (kg)</label>
            <input
              type="number"
              placeholder="Enter weight in kg"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              step="0.1"
            />
          </div>
          <div>
            <label>Height</label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="number"
                placeholder="Feet"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
              />
              <input
                type="number"
                placeholder="Inches"
                value={inches}
                onChange={(e) => setInches(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button className="btn" type="submit">Submit</button>
            <button className="btn" type="button" onClick={reload}>Reload</button>
          </div>
        </form>

        {bmi && (
          <div className="message">
            <h3>Your BMI is: {bmi}</h3>
            <p>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
