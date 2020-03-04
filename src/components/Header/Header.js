import React from 'react';
import './header.css';

function Header(){
    return(
      <div className="header">
        <div className="">
          <span style={{color: "#3399FD"}}>React</span> ToDo List
        </div>
        <div>
          Click on task to toogle complete
        </div>
      </div>
    );
  };

export default Header;
