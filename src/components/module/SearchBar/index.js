import React, { useState } from 'react'
import style from './style.module.css'
import searchIcon from './search.svg'
import plus from './plus.svg'

const SearchBar = () => {
  const [search, setSearch] = useState('')
  return (
    <div className={style.search}>
      <img src={searchIcon} className={style.searchicon} alt="" />
      <input type="text" name="search" id="search" onChange={(e) => setSearch(e.target.value)} placeholder="Type your message.."/>
      <img src={plus} className={style.plus} alt="" />
    </div>
  )
}

export default SearchBar