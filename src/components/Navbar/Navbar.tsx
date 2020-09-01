import React from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import {useCookies} from "react-cookie";
import config from "../../config/config";

const Navbar = () => {

  const { t } = useTranslation()
  const history = useHistory()
  const [,, removeCookie] = useCookies()

  const handleLogout = () => {
    removeCookie('auth')
    history.push('/login')
  }

  return (
    <div className='navbar'>
      <span className='navbar__brand-icon'>W</span>
      <Link to='/' className='navbar__link'>{t('navbar.home')}</Link>
      <h1 className="navbar__title">{config.appName}</h1>
      <button className='navbar__logout' onClick={handleLogout}>{t('navbar.logout')}</button>
    </div>
  )
}

export default Navbar