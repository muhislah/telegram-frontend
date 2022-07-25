import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const Form = () => {
    const [message, setMessage] = useState('')
    const [socket, setSocket] = useState(null)
    const [response, setResponse] = useState('')
    const [idSocket, setIdSocket] = useState('')
    useEffect(() => {
        setSocket(io('http://localhost:3000'))
    },[])
    
    const handleSubmit = (e) => {
        setIdSocket(socket.id)
        e.preventDefault()
        socket.emit('message', message)
        setMessage('')
        socket.on('response', (response) => {
            setResponse(response)
        })
    }
  return (
    <div>
        <h1>id = {idSocket} </h1>
        <form action="" onSubmit={(e) => handleSubmit(e)}>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
        </form>
        <p style={{
            color: "red"
        }}>{response}</p>
    </div>
  )
}

export default Form