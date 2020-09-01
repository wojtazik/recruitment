import React from 'react'
import ReactDOM from 'react-dom'
import i18n from 'i18next'
import { initReactI18next, I18nextProvider } from 'react-i18next'
import resources from './translations/resources'
import Routing from "./components/Routing/Routing";
import 'reset-css'

if (document.getElementById('simple-app-root')) {
  const i18nInstance = i18n.createInstance()
  i18nInstance
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en',
      keySeparator: false,
      interpolation: {
        escapeValue: false
      }
    })

  ReactDOM.render(
    <I18nextProvider i18n={i18nInstance}>
      <Routing />
    </I18nextProvider>,
    document.getElementById('simple-app-root')
  )
}
