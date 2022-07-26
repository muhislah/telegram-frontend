import React from 'react'
import style from './style.module.css'
import calvin from './calvin.jpg'
import exit from './exit.svg'
import Input from '../../base/Input'
import Button from '../../base/Button'
import { useState } from 'react'
import axios from 'axios'

const ModalEdit = ({ setEditModal, data , token , setUpdating }) => {
  const [photo, setPhoto] = useState({})
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')
  const [phone, setPhone] = useState('')
  const [uploading, setUploading] = useState(false)
  const handleImage = (e) => {
    setPhoto({
      file: e.target.files[0],
      preview: URL.createObjectURL(e.target.files[0])
    })
  }

  const handleUpdate = async () => {
    try {
      setUploading(true)
      const data = new FormData()
      data.append('fullname', fullname)
      data.append('email', email)
      data.append('bio', bio)
      data.append('photo', photo.file)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
        // withCredentials: true
      }
      const result = await axios.put(process.env.REACT_APP_BACKEND_API + '/profile/', data, config)
      setUploading(false)
      alert('success')
      setUpdating((current) => current = current+1)
      setEditModal((current) => !current)
    } catch (error) {
      console.log(error)
    }


  }


  return (
    <div className={style.shadow}>
      <div className={style.box}>
        <div className={style.exit}>
          <img src={exit} alt="exit" onClick={() => setEditModal((current) => !current)} />
        </div>
        <div className={style.editprofile}>
          <div style={{
            flexDirection: "column",
            alignItems: 'center',
            display: 'flex'
          }}>
            <img src={photo?.preview ? photo.preview : data?.photo || calvin} alt="" className={style.profile} />
            <Button type='' style={{
              position: 'relative',
              marginBottom: '20px',
              width: '100%',
              marginTop: '20px'
            }}><input type="file" accept='image/*' onChange={handleImage} style={{
              width: '100%',
              height: '100%',
              opacity: 0,
              position: 'absolute'
            }} />Edit image</Button>
          </div>
          <div className={style.identity}>
            <div>
              <div>
                <label htmlFor="fullname">Name :</label>
                <Input defaultValue={data.fullname} onChange={(e) => setFullname(e.target.value)} id="fullname" name="fullname" />
              </div>
              <div>
                <label htmlFor="email">Email :</label>
                <Input defaultValue={data.email} onChange={(e) => setEmail(e.target.value)} id="email" type="email" name="emai" />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="bio">Bio :</label>
                <Input defaultValue={data.bio} onChange={(e) => setBio(e.target.value)} id="bio" name="bio" />
              </div>
              <div>
                <label htmlFor="tel">Phone :</label>
                <Input defaultValue={data?.phone} onChange={(e) => setPhone(e.target.value)} id="tel" type="tel" name="phone" />
              </div>
            </div>
          </div>
          <Button type='' onClick={handleUpdate} style={{
            position: 'relative',
            marginBottom: '20px'
          }}>{uploading ? 'Updating...' : 'Update Profile'}</Button>
        </div>
      </div>
    </div>
  )
}

export default ModalEdit