import React from 'react'
import style from './style.module.css'
import calvin from './calvin.jpg'
import { useRef } from 'react'

const Card = ({onClick , ...props}) => {
  const thisRef = useRef(null)
  return (
    <div className={style.card} onClick={onClick} style={{
      background : props.selected ? '#ecf1fd' : '#fff'
    }}>
      <img src={props?.photo || calvin} alt="" style={{
        borderRadius : '10px'
      }}/>
      <div className={style.middle}>
        <div className={style.name}>
          <h6>{props.name}</h6>
        </div>
        <div className={style.message}>
          <p>{props.lastMessage.slice(0,25)}</p>
        </div>
      </div>
      <div className={style.last}>
        <div className={style.lastime}>
          <span>{props.lastTime}</span>
        </div>
        {/* <div className={style.notification}>
          <span>2</span>
        </div> */}
      </div>
    </div>
  )
}

export default Card