import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [joke, setJoke] = useState({ setup: '', punchline: '' });
  const [loading, setLoading] = useState(false);

  const getJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://official-joke-api.appspot.com/random_joke');
      const data = await response.json();
      setJoke(data);
    } catch (error) {
      console.error('Error fetching joke:', error);
      setJoke({ setup: 'Oops!', punchline: 'Failed to fetch a joke 😢' });
    }
    setLoading(false);
  };

  useEffect(() => {
    getJoke(); 
  }, []);

  return (
    <div className="App">
      <h1> Random Joke Generator</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="joke-container">
          <p className="setup">{joke.setup}</p>
          <p className="punchline">{joke.punchline}</p>
        </div>
      )}
      <button onClick={getJoke}>Get Another Joke</button>
    </div>
  );
}

export default App;
