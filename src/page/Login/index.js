import React, { useState } from 'react'
import Button from '../../components/base/Button'
import Input from '../../components/base/Input'
import style from './style.module.css'
import { useNavigate } from 'react-router-dom'
import google from './google.svg'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }
  const handleSubmit = async (e) => {
    const result = await axios.post(process.env.REACT_APP_BACKEND_API+'/auth/login', user)
    const message = result.data.message
    if (message == 'USERNAME OR PASSWORD WRONG'){
      return alert('username or password wrong')
    }else if (message == 'USER NOT REGISTERED'){
      alert('user not registered')
      navigate('/register')
    }else {
      alert('login success')
      localStorage.setItem('token', result.data.data.token)
      navigate('/')
    }
  }
  return (
    <div className={style.body}>
      <div className={style.formbox} >
        <h4>Login</h4>
        <p>Hi, Welcome back</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="email">Email</label>
          <Input type="email" name="email" id="email" onChange={(e) => handleChange(e)} />
          <label htmlFor="password">Password</label>
          <Input type="password" name="password" id="password" onChange={(e) => handleChange(e)} />
        </form>
        <p className='float-right' style={{
          color : '#7E98DF'
        }}>Forgot password</p>
        <Button title='Login' onClick={() => handleSubmit()} />
        <p className='text-center mx-auto my-1'>Login with</p>
        <Button title='Google' className='white'><img src={google} className="mr-2" alt="" /></Button>
        <p className='text-center mx-auto my-1'>Don't have a account ? <span onClick={() => navigate('/register')}>Sign up</span></p>
      </div>
    </div>
  )
}

export default Login