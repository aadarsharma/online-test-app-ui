import React, { useState, useEffect } from 'react';
import './OnlineTest.css';

const OnlineTest = () => {
  const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes in seconds
  const [currentQuestion, setCurrentQuestion] = useState({
    id: 1,
    text: 'Which state has topped the highest employability rate, as per latest India Skills Report 2019',
    options: ['Andhra Pradesh', 'Karnataka', 'Tamil Nadu', 'Rajasthan'],
  });
  const [questionStatus, setQuestionStatus] = useState(Array(50).fill(false));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSaveAndNext = () => {
    setQuestionStatus((prevStatus) => {
      const newStatus = [...prevStatus];
      newStatus[currentQuestion.id - 1] = true;
      return newStatus;
    });
  };

  return (
    <div className='flex-container'>
      <div></div>
    <div className="online-test">
      <h1 className="text-align-right">Online Test</h1>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${(2700 - timeLeft) / 27}%` }}></div>
      </div>
      <div className="time-left">⏲ Time Left: {formatTime(timeLeft)}</div>
      <div className="test-content">
        <div className='column'>
          <div className="content-box question-section">
            <h3>Question</h3>
            <p>{currentQuestion.id}. {currentQuestion.text}</p>
            {currentQuestion.options.map((option, index) => (
              <label key={index} className="option">
                <input type="radio" name="answer" value={option} />
                {option}
              </label>
            ))}
            <p className='pad'></p>
          </div>
          <div className="button-group">
              <div></div>
              <div>
                <button className="skip-button">Skip</button>
              </div>
              <div>
                <button className="save-next-button" onClick={handleSaveAndNext}>Save & Next →</button>
              </div>
          </div>
        </div>
        <div>
          <div>
          <div className='content-box1 bg-color-400'>
              <h2 className='bg-color-400'>Questions Status</h2>
          </div>
          <div className="content-box questions-status">
            <div className="status-grid">
              {questionStatus.map((status, index) => (
                <div key={index} className={`status-item ${status ? 'attempted' : ''}`}>
                  <div className='padding'>
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="status-legend">
            <div className="legend-item">
              <div className="legend-color attempted"></div>
                <span>Attempted</span>
            </div>
            <div className="legend-item">
              <div className="legend-color not-attempted"></div>
              <span>Not Attempted</span>
            </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default OnlineTest;