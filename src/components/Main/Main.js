import React, { useState } from 'react';
import axios from 'axios';
import './main.css';



function Main(){
  let [inputValue, setInputValue] =  useState(''); //состояние инпута
  let [userData, setUserData] = useState([]); // массив с делами
  // TODO: add data state initial state = []
  let [data, setData] = useState([]);
  
  
  axios.get('http://localhost:3000/posts')
  .then(function (response) {
    const post = response.data;
    setData({post});
    console.log(post);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
  // TODO: add server request
  // TODO: save data

  const handler = function (ev) {
    const value = ev.target.value;
    setInputValue(value);
  }

  function submitButton () {
    setUserData(prevState => [...prevState, inputValue]);
    setInputValue('');
  }

  return(
    <div className="main">
      <div className="inputfield">
        <input 
          onChange = {handler}
          type="text"
          id="input" 
          placeholder="What shall I do today?"
          value={inputValue}
          />
        <button onClick={submitButton}>+</button>
      </div> 
      <div id="textfield">
        {userData.map((string, idx) => <><p key={idx}>{string}</p></>)}
      </div>
      <div>
        {data.map((post) => (
          <>
            <p key={post.id}
               title={post.title}>
                 {post}
            </p>
          </>
        ))}
      </div>
    </div>
  );
};

export default Main;
