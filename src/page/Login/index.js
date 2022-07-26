import React, { useState } from 'react'
import Button from '../../components/base/Button'
import Input from '../../components/base/Input'
import style from './style.module.css'
import { useNavigate } from 'react-router-dom'
import google from './google.svg'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [loading, setLoading] = useState(false)
  const isDisabled = !(user.email && user.password)
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await axios.post(process.env.REACT_APP_BACKEND_API + '/auth/login', user)
    const message = result.data.message
    if (message == 'USERNAME OR PASSWORD WRONG') {
      return alert('username or password wrong')
    } else if (message == 'USER NOT REGISTERED') {
      alert('user not registered')
      setLoading(false)
      navigate('/register')
    } else {
      toast('test')
      localStorage.setItem('token', result.data.data.token)
      setLoading(false)
      navigate('/')
    }
  }
  return (
    <div className={style.body}>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className={style.formbox} >
        <h4>Login</h4>
        <p>Hi, Welcome back</p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="email">Email</label>
          <Input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" name="email" id="email" onChange={(e) => handleChange(e)} />
          <span className={style.email}></span>
          <label htmlFor="password">Password</label>
          <Input type="password" minlength="6" maxlength="32" size="32" name="password" id="password" onChange={(e) => handleChange(e)} />
          <span className={style.password}></span>
          <p className='float-right' style={{
            color: '#7E98DF'
          }}>Forgot password</p>
          <Button title={loading ? "Logging in.." : "Login"} type="submit" disabled={isDisabled}/>
        </form>
        <p className='text-center mx-auto my-1'>Login with</p>
        <Button title='Google' className='white'><img src={google} className="mr-2" alt="" /></Button>
        <p className='text-center mx-auto my-1'>Don't have a account ? <span onClick={() => navigate('/register')}>Sign up</span></p>
      </div>
    </div>
  )
}

export default Login