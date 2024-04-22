import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [textColor, setTextColor] = useState('#000000');
  const [buttonColor, setButtonColor] = useState('#4CAF50'); // 默认按钮颜色为绿色
  const [error, setError] = useState('');
  const [joke, setJoke] = useState('');
  const [emojis, setEmojis] = useState([]);
  const [showEmoji, setShowEmoji] = useState(false); // 添加一个 state 来控制笑脸图标的显示

  const handleGetJoke = async () => {
    try {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      const jokeText = response.data.value;
      setJoke(jokeText);
      setError('');
      addEmoji(); // 每次点击按钮时添加一个 emoji
    } catch (error) {
      console.error('Error fetching joke:', error);
      setError('Error fetching joke. Please try again.');
    }
  };

  const addEmoji = () => {
    setShowEmoji(true); // 显示笑脸图标
    setEmojis([...emojis, <span key={emojis.length} className="emoji">😊</span>]);
    setTimeout(() => {
      setShowEmoji(false); // 1 秒后隐藏笑脸图标
    }, 1000);
  };

  const handleTextColorChange = (colorHex) => {
    setTextColor(colorHex);
    setButtonColor(colorHex); // 设置按钮颜色为与文本颜色相同
  };

  return (
    <div className="App" style={{ color: textColor }}>
      <h1>Fun App</h1>
      <div id="emojiContainer">
        {showEmoji && <span className="emoji">😊</span>} {/* 控制笑脸图标的显示 */}
      </div>
      <button
        id="jokeButton"
        style={{ backgroundColor: buttonColor }} // 设置按钮背景颜色
        onClick={handleGetJoke}
        disabled={showEmoji} // 如果笑脸图标正在显示，禁用按钮
      >
        Get a joke
      </button>
      <div>
        {joke && <p>{joke}</p>}
        {error && <p>{error}</p>}
      </div>
      <div>
        <label htmlFor="textColorInput">Choose a text color:</label>
        <input
          id="textColorInput"
          type="color"
          onChange={(e) => handleTextColorChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App;
