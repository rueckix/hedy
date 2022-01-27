const languagePicker = require('./language_picker_page')
const I = actor(require('../steps_file')())

module.exports = {
  testStartPage() {
      languagePicker.selectEnglishLanguage()
  }
}
