import { useState } from 'react';
import './App.css';

function App() {

  // State variables
  const [weight, setWeight] = useState(0);       // in kilograms
  const [feet, setFeet] = useState(0);           // height (feet part)
  const [inches, setInches] = useState(0);       // height (inches part)
  const [bmi, setBmi] = useState('');
  const [message, setMessage] = useState('');

  // Function to calculate BMI
  // It takes an event as an argument to prevent default form submission behavior
  // It checks if the weight and height are valid, calculates BMI, and sets the message
  // based on the BMI value
  // It also handles the case where the user clicks the reload button to reset the form
  // and clear the results
  const bmiCal = (e) => {
    e.preventDefault();

    if (weight <= 0 || (feet <= 0 && inches <= 0)) {
      alert("Please enter valid weight and height");
      return;
    }

    // Convert height from feet and inches to meters
    // 1 foot = 12 inches, 1 inch = 0.0254
    const totalInches = (Number(feet) * 12) + Number(inches);
    const heightInMeters = totalInches * 0.0254; // convert to meters

    const calculatedBmi = weight / (heightInMeters * heightInMeters);
    const roundedBmi = calculatedBmi.toFixed(1);

    setBmi(roundedBmi);


    // Set message based on BMI value
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


  // Function to reset the form and clear the results
  // It sets all state variables to their initial values
  // This function is called when the user clicks the reload button
  // It resets the weight, feet, inches, bmi, and message to their initial states
  // This allows the user to start over without refreshing the page
  // It also ensures that the form is ready for new input
  // and the results are cleared
  // This is useful for user experience, allowing them to quickly re-enter data
  // without having to reload the entire application
  // It provides a convenient way to reset the form without losing the application state
  const reload = () => {
    setWeight(0);
    setFeet(0);
    setInches(0);
    setBmi('');
    setMessage('');
  };

  // Render the BMI calculator form
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
