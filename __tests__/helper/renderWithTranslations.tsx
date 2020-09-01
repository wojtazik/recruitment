import React from 'react'
import { render } from '@testing-library/react'
import i18n from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import resources from '../../src/translations/resources'

export default (component: any) => {
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

  return {
    ...render(<I18nextProvider i18n={i18nInstance}>{component}</I18nextProvider>)
  }
}
