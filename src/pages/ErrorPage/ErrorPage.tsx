import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import './ErrorPage.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { StateInterface } from '../../model/stateInterface'

const ErrorPage = () => {
  const { t } = useTranslation()
  const errorInfo = useSelector((state: StateInterface) => state.errorState)

  return (
    <div className='error-page'>
      <h2 className='error-page__error-code'>{errorInfo.errorCode}</h2>
      <p className='error-page__error-text'>{errorInfo.errorMessage}</p>
      <Link to='/' className='error-page__come-back-button'>{t('error-page.come-back')}</Link>
    </div>
  )
}

export default ErrorPage
