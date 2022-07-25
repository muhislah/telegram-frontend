import React from 'react'
import style from './style.module.css'
import calvin from './calvin.png'

const Card = ({onClick , ...props}) => {
  return (
    <div className={style.card} onClick={onClick}>
      <img src={calvin} alt=""/>
      <div className={style.middle}>
        <div className={style.name}>
          <h6>{props.name}</h6>
        </div>
        <div className={style.message}>
          <p>Hi, bro! Come to my house!</p>
        </div>
      </div>
      <div className={style.last}>
        <div className={style.lastime}>
          <span>15:13</span>
        </div>
        <div className={style.notification}>
          <span>2</span>
        </div>
      </div>
    </div>
  )
}

export default Card