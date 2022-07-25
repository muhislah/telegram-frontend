import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import calvin from './calvin.png'
import axios from 'axios'

const Profile = ({token}) => {
  const [me, setMe] = useState({})
  const fetchMe = async (token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    try {
      const result = await axios.get(process.env.REACT_APP_BACKEND_API+'/profile/', config)
      setMe(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMe(token)
  }, [])

  return (
    <div className={style.profile}>
      <img src={calvin} alt="" />
      <h5 className='my-0 mt-2'>{me?.fullname}</h5>
      <p className='mx-0 my-0 py-0'>{me?.email}</p>
    </div>
  )
}

export default Profile