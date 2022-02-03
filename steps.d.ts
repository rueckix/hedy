/// <reference types='codeceptjs' />
type steps_file = typeof import('./e2e_tests/steps_file.js');
type LanguagePickerHelper = import('./e2e_tests/helper/language_picker.helper.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface Methods extends Playwright, LanguagePickerHelper {}
  interface I extends ReturnType<steps_file>, WithTranslation<LanguagePickerHelper> {}
  namespace Translation {
    interface Actions {}
  }
}
