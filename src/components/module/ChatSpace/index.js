import React, { useEffect, useState } from 'react'
import style from './style.module.css'
import profilemenu from './profilemenu.svg'
import calvin from './calvin.png'
import axios from 'axios'
import ScrollToBottom from 'react-scroll-to-bottom'

const ChatSpace = ({ receiver_id, socket }) => {
  const token = localStorage.getItem('token')
  const [messages, setMessages] = useState([])
  const [profile, setProfile] = useState({})
  const [message, setMessage] = useState('')
  const [me, setMe] = useState({})
  const [showProfile, setShowProfile] = useState(false)


  const fetchMessage = async (token, receiver_id) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    try {
      const result = await axios.get(process.env.REACT_APP_BACKEND_API + '/message/' + receiver_id, config)
      setMessages(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchMe = async (token) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    try {
      const result = await axios.get(process.env.REACT_APP_BACKEND_API + '/profile/', config)
      setMe(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchProfile = async (receiver_id) => {
    try {
      const result = await axios.get(process.env.REACT_APP_BACKEND_API + '/profile/' + receiver_id)
      setProfile(result.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleMessage = () => {
    const body = message
    const sender_id = me.id
    socket.emit('sendMessage', { receiver_id, sender_id, body })
  }

  useEffect(() => {
    setMessages([])
    fetchMessage(token, receiver_id)
    fetchProfile(receiver_id)
    fetchMe(token)
  }, [receiver_id])

  const addMessage = async (message) => {
    try {
      delete message.sender_id
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }
      const result = await axios.post(process.env.REACT_APP_BACKEND_API + '/message/add', message, config)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (socket) {
      socket.off('incoming')
      socket.on('incoming', (message) => {
        console.log('new Message coming')
        if ((message.sender_id === me.id && message.receiver_id === receiver_id) || (message.sender_id === receiver_id && message.receiver_id === me.id)) {
          setMessages((current) => [...current, message])
        }
        if (message.sender_id === me.id) {
          addMessage(message)
        }
        setMessage('')
      })
    }
  }, [socket, addMessage, receiver_id])

  if (receiver_id) {
    return (
      <div className='d-flex flex-row'>
        <div className={style.chatspace}>
          <div className={style.headchat}>
            <img src={calvin} alt="" id="photo" />
            <div >
              <h5 onClick={() => setShowProfile(!showProfile) }>{profile ? profile.fullname : 'No Name'}</h5>
              <span>Online</span>
            </div>
            <img src={profilemenu} alt="" id="menu" />
          </div>
          <div className={style.bodychat}>

            {
              messages ? messages.map((data) => {
                return <div id="message" key={data.id} className={data.receiver_id !== receiver_id ? style.left : style.right}>{data.body}</div>
              }) : ''
            }

          </div>
          <div className={style.chatinput}>
            <input type="text" placeholder='Type your message...' value={message} onChange={(e) => setMessage(e.target.value)} />
            <button onClick={() => handleMessage()}>Send</button>
          </div>
        </div>
        <div className={style.profile} style={{
          visibility : showProfile ? 'visible' : 'hidden'
        }}>
          Hello
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="d-flex h-100">
      </div>
    )
  }
}

export default ChatSpace