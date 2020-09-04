import React from 'react'
import ReactDOM from 'react-dom'
import i18n from 'i18next'
import { initReactI18next, I18nextProvider } from 'react-i18next'
import resources from './translations/resources'
import Routing from './components/Routing/Routing'
import 'reset-css'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducerRoot from './store/reducers/index'

if (document.getElementById('simple-app-root')) {
  const store = createStore(reducerRoot)

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
    <Provider store={store}>
      <I18nextProvider i18n={i18nInstance}>
        <Routing />
      </I18nextProvider>
    </Provider>,
    document.getElementById('simple-app-root')
  )
}
