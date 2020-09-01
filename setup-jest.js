global.window = window

const langMock = jest.mock('react-i18next', () => ({
  ...jest.requireActual('react-i18next'),
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      language: 'pl',
      changeLanguage(lng) {
        console.log('aaa')
        this.language = lng
      }
    }
  })
}))

module.exports = langMock
