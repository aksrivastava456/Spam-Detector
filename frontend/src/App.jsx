import {useState} from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://spam-detector-n8of.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      // const response = await fetch('http://127.0.0.1:5000/predict', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message }),
      // });
      const data = await response.json();
      setResult(data.prediction);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Spam Detector</h1>
      <br></br>
      <p>Welcome to the Spam Detector application!</p>
      <br></br>
      <p>Use the form below to submit text and predict if it's spam or not.</p>
      <br></br>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Enter your message here" style={{ width: '300px', padding: '10px' }} />
      <br></br> <br></br>
      <button onClick={handleSubmit} style={{ marginLeft: '10px', padding: '10px 20px' }}>Predict</button>
      {result && <p style={{ marginTop: '20px', fontSize: '18px', color: result === 'Spam' ? 'red' : 'green' }}>Prediction: {result}</p>}
    </div>
  );
}

export default App;