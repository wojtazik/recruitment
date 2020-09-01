import React from 'react'
import ReactDOM from 'react-dom'
import i18n from 'i18next'
import { initReactI18next, I18nextProvider } from 'react-i18next'
import resources from './translations/resources'

if (document.getElementById('simple-app-root')) {
  const i18nInstance = i18n.createInstance()
  i18nInstance
    .use(initReactI18next)
    .init({
      resources,
      lng: 'pl',
      keySeparator: false,
      interpolation: {
        escapeValue: false
      }
    })

  ReactDOM.render(
    <I18nextProvider i18n={i18nInstance}>
      World Hello
    </I18nextProvider>,
    document.getElementById('simple-app-root')
  )
}
