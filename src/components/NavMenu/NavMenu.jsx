import React from 'react'
import './NavMenu.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'





export const NavMenu = ({currentView, setCurrentView}) => {

  const handleBtnClick = (section) => {
    setCurrentView(section)
  }

  return (
    <nav className='navmenu'>
      <ul className='navmenu-list'>
        <li className={currentView === 'home' ? 'selected navmenu-list-item' : 'navmenu-list-item'}><button className='selected' onClick={() => {handleBtnClick('home')}}> <FontAwesomeIcon style={{marginRight: '10px'}} icon={faHouse}/>Home</button></li>
        <li className={currentView === 'favorites' ? 'selected navmenu-list-item' : 'navmenu-list-item'}><button onClick={() => {handleBtnClick('favorites')}}> <FontAwesomeIcon style={{marginRight: '10px'}} icon={faStar}/>Favorites</button></li>
        <li className={currentView === 'toread' ? 'selected navmenu-list-item' : 'navmenu-list-item'}><button onClick={() => {handleBtnClick('toread')}}> <FontAwesomeIcon style={{marginRight: '10px'}} icon={faBookOpen}/>ToRead</button></li>
        <li className={currentView === 'finished' ? 'selected navmenu-list-item' : 'navmenu-list-item'}><button onClick={() => {handleBtnClick('finished')}}> <FontAwesomeIcon style={{marginRight: '10px'}} icon={faCircleCheck}/>Finished</button></li>
        <li className={currentView === 'search' ? 'selected navmenu-list-item' : 'navmenu-list-item'}><button onClick={() => {handleBtnClick('search')}}> <FontAwesomeIcon style={{marginRight: '10px'}} icon={faMagnifyingGlass}/>Search</button></li>
      </ul>
    </nav>
  )
}