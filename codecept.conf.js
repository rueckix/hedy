exports.config = {
  output: 'e2e_tests/output',
  helpers: {
    Playwright: {
      show: true,
      restart: false,
      keepBrowserState: true,
      keepCookies: true,
      chromium:{
        userDataDir: '/tmp/playwright-tmp', // necessary to launch the browser in normal mode instead of incognito,
      }
    },
      LanguagePickerHelper:{
      require: './e2e_tests/helper/language_picker.helper.js'
      }
  },
  include: {
    I: './e2e_tests/steps_file.js'
  },

  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './e2e_tests/features/*.feature',
    steps: ['./e2e_tests/step_definitions/steps.js']
  },
  plugins: {
    screenshotOnFail: {
      enabled: true
    },
    pauseOnFail: {},
    retryFailedStep: {
      enabled: true
    },
    tryTo: {
      enabled: true
    }
  },
  stepTimeout: 0,
  stepTimeoutOverride: [{
      pattern: 'wait.*',
      timeout: 0
    },
    {
      pattern: 'amOnPage',
      timeout: 0
    }
  ],
  tests: 'e2e_tests/tests/*_test.js',
  name: 'hedy'
}