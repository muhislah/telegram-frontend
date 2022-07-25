import React, { useEffect, useState } from 'react'
import Card from '../components/module/Card'
import ChatSpace from '../components/module/ChatSpace'
import SearchBar from '../components/module/SearchBar'
import Title from '../components/module/Title'
import style from './style.module.css'
import {useDispatch , useSelector} from 'react-redux'
import { userAction } from '../configs/redux/actions/userAction'
import io from 'socket.io-client'
import Profile from '../components/module/Profile'

const Home = () => {
  const token = localStorage.getItem('token')
  const [showProfile, setShowProfile] = useState(false)
  const dispatch = useDispatch()
  const [receiver_id, setReceiver_id] = useState('')
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    dispatch(userAction(token))
    const result = io(process.env.REACT_APP_BACKEND_API, {
      query : {
        token : token
      }
    })
    setSocket(result)
  }, [])

  const handleProfile = () => {
    setShowProfile(current =>  !current)
  }

  const {user} = useSelector((state) => state)

  return (
    <div className={style.main}>
      <section className={style.sidebar}>
        <Title callback={handleProfile}/>
        { showProfile ? 
        <Profile token={token}/> : "" }
        <SearchBar />
        <div className={style.chatlist}>
          {
            user ? user.map(data =>  <Card name={data.fullname} key={data.id} onClick={() => setReceiver_id(data.id)} />)  : <div>No User</div>
          }
        </div>
      </section>
      <section className={style.mainchat}>

        <ChatSpace receiver_id={receiver_id} socket={socket}/>
      </section>
    </div>
  )
}

export default Home