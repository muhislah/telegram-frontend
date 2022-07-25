import React from 'react'
import style from './style.module.css'

const Input = (props) => {
  return (
    <input {...props} className={style.form}/>
  )
}

export default Input