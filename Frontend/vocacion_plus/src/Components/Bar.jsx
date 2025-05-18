import React from 'react'
import './Bar.css'
import menu from '../images/menu.png';
import user from '../images/user.png';
const Bar = () => {
  return (
    <div>
        <div className="bar">
        <div className="menu">
            <img className="menu1"src={ menu } alt="Menu"/>
        </div>
        <h1 className="nombre">
            Vocación+
        </h1>
        <div className="user">
            <img className="user1" src={ user } alt="user"/>
        </div>
        </div>



    </div>
  )
}

export default Bar