import React, { useState } from 'react'
import style from './style.module.css'
import searchIcon from './search.svg'
import plus from './plus.svg'
import { useEffect } from 'react'

const SearchBar = ({handleSearch}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch(search)
  }
  const [search, setSearch] = useState('')
  return (
      <form onSubmit={(e) => handleSubmit(e)}>
    <div className={style.search}>
      <img src={searchIcon} className={style.searchicon} alt="" />
        <input type="text" name="search" id="search" onChange={(e) => setSearch(e.target.value)} placeholder="Type your message.."/>
      <img src={plus} className={style.plus} alt="" />
    </div>
      </form>
  )
}

export default SearchBar