import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import Button from '../../components/base/Button'
import Input from '../../components/base/Input'
import style from './style.module.css'
import google from './google.svg'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const isDisabled = !(user.email && user.password && user.fullname)
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(user)
    const result = await axios.post(process.env.REACT_APP_BACKEND_API+'/auth/register', user )
    console.log(result.data)
    if(result.data.message === "REGISTER SUCCESS"){
      alert('success')
      navigate('/login')
    }else{
      alert('register failed')
    }
  }
  return (
    <div className={style.body}>
      <div className={style.formbox} >
        <div className={style.arrow} onClick={() => navigate('/login')}></div>
        <h4>Register</h4>
        <p>Let's create your account</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="name">Name</label>
          <Input type="text" pattern="^[A-Za-zÀ-ÿ ,.'-]+$" maxlength="32" name="fullname" id="fullname" onChange={(e) => handleChange(e)} />
          <span className={style.name}></span>
          <label htmlFor="email">Email</label>
          <Input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" name="email" id="email" onChange={(e) => handleChange(e)} />
          <span className={style.email}></span>
          <label htmlFor="password">Password</label>
          <Input type="password" minlength="6" maxlength="32" size="32" name="password" id="password" onChange={(e) => handleChange(e)} />
          <span className={style.password}></span>
          <Button title='Register' type="submit" disabled={isDisabled}/>
        </form>
        <p className='text-center mx-auto my-1'>Register with</p>
        <Button className='white' title='Google'><img src={google} className="mr-2" alt="" /></Button>
      </div>
    </div>
  )
}

export default Register