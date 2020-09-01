import React, {FormEvent} from "react";
import { useFormik } from 'formik'
import loginRequest from "../../utils/loginRequest";
import {useCookies} from "react-cookie";
import {useTranslation} from 'react-i18next'
import './Login.scss'
import config from "../../config/config";

const Login = () => {

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formik.isSubmitting) {
      formik.handleSubmit()
    }
  }

  const { t } = useTranslation()

  const [, setCookie] = useCookies(['auth']);

  const formik  = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async (values) => {
      const response = await loginRequest(values, setCookie)
    }
  })

  return (
    <div className='login'>
      <h1 className='login__app-title'>{config.appName}</h1>
      <form className="login__form-container" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name='username'
          placeholder={t('form.username')}
          className='login__input'
          value={formik.values.username}
          onChange={formik.handleChange}
        />
        <input
          type="password"
          name='password'
          placeholder={t('form.password')}
          className='login__input'
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <button type='submit' className='login__submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login