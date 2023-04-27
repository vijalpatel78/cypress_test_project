const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  //Cucumber setup
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));
  return config;
}

module.exports = defineConfig({
  projectId: 'kih7wj',
  e2e: {
    setupNodeEvents, 
    specPattern: ['cypress/integration/**/**/*.feature']
  },
  env: {
    url: 'https://www.visualcomfort.com'
  },
  defaultCommandTimeout: 60000,
  pageLoadTimeout: 180000
});