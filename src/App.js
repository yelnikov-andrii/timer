import { useEffect, useState } from 'react';
import './App.css';
import { MyButton } from './Components/MyButton';

function App() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeToset, setTimeToset] = useState(0);


  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(prevElapsedTime => prevElapsedTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  function handleStart() {
    setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setElapsedTime(0);
    setTimeToset(0)
  }

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  }

  function saveTime(time) {
    localStorage.setItem('time', time.toString());
  }

  useEffect(() => {
  const savedTime = localStorage.getItem('time');
  if (savedTime) {
    setElapsedTime(parseInt(savedTime));
  }
}, []);

useEffect(() => {
  saveTime(elapsedTime);
},[elapsedTime])


  return (
    <div className="App">
      <header className="header">
        <div className='container'>
          <h1 className='header__h1'>
            This is timer
          </h1>
        </div>
      </header>
      <section className='main'>
        <div className='container main__block'>
          <p className='main__title'>
            {formatTime(elapsedTime)}
          </p>
        <div className='buttons'>
          {!isRunning && (
            <MyButton onClick={handleStart}>Start</MyButton>
          )}
          {isRunning && (
            <MyButton onClick={handlePause}>Pause</MyButton>
          )}
          <MyButton onClick={handleReset}>Reset</MyButton>
          <MyButton onClick={(e) => {
            e.preventDefault();
            saveTime(elapsedTime);
          }}>Save</MyButton>
        </div>
        </div>
      </section>
      <section className='main'>
        <div className='container main__block'>
        <input 
          placeholder='Set time'
          className='input'
          value={timeToset}
          onChange={(e) => {
            if (+e.target.value || +e.target.value === 0) {
              setTimeToset(e.target.value)
            }
          }}
        />
        <MyButton onClick={(e) => {
          e.preventDefault();
          saveTime(timeToset);
          setElapsedTime(parseInt(timeToset))
        }}>
          Set time
        </MyButton>
        </div>
      </section>
    </div>
  );
}

export default App;
