import React, { FormEvent, useState } from 'react'
import { useFormik } from 'formik'
import loginRequest from '../../utils/loginRequest'
import { useCookies } from 'react-cookie'
import { useTranslation } from 'react-i18next'
import './Login.scss'
import config from '../../config/config'
import * as Yup from 'yup'
import { setError } from '../../store/actions/errorActions'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Login = () => {
  const [loginError, setLoginError] = useState(null)
  const history = useHistory()
  const dispatch = useDispatch()

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formik.isSubmitting) {
      formik.handleSubmit()
    }
  }

  const { t } = useTranslation()

  const [, setCookie] = useCookies(['auth'])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .required(),
      password: Yup.string()
        .required()
    }
    ),
    onSubmit: async (values) => {
      const response = await loginRequest(values, setCookie)
      if (response.status !== 200) {
        setLoginError(response)
      }
      if (response.status !== 200 && response.status !== 403) {
        dispatch(setError({ errorCode: response.status, errorMessage: response.response }))
        history.push('/error')
      }
    }
  })

  return (
    <div className='login'>
      <h1 className='login__app-title'>{config.appName}</h1>
      <form className='login__form-container' onSubmit={handleFormSubmit}>
        {((formik.errors.username || formik.errors.password) || loginError) &&
          <p className='login__error'>
            {loginError ? loginError.response : t('form.empty-inputs')}
          </p>}
        <input
          type='text'
          name='username'
          placeholder={t('form.username')}
          className={`login__input ${formik.errors.username ? 'login__input--error' : ''}`}
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder={t('form.password')}
          className={`login__input ${formik.errors.password ? 'login__input--error' : ''}`}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <button type='submit' className='login__submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login
