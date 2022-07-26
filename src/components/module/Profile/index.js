import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import calvin from './calvin.jpg'
import Button from '../../base/Button'
import { useNavigate } from 'react-router'

const Profile = ({data , setEditModal }) => {
  const navigate = useNavigate()
  return (
    <div className={style.profile}>
      <img src={data?.photo || calvin} alt="" style={{
        borderRadius : "25px"
      }} />
      <h5 className='my-0 mt-2'>{data.fullname}</h5>
      <p className='mx-0 my-0 py-0'>{data.email}</p>
      <Button title="Edit Profile"style={{
        width: '50%',
        margin: '5px auto'
      }} onClick={() => setEditModal((current) => !current)}/>
    </div>
  )
}

export default Profile