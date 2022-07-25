import React from 'react'
import style from './style.module.css'

const Button = ({title, className , children, ...props}) => {
  return (
    <button {...props} className={ className == 'white' ? style.buttonwhite : style.button}>{children}{title}</button>
  )
}

export default Button