const { defineConfig } = require("cypress");

module.exports = defineConfig({
  video: true,
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);

    },
    env: {
      CYPRESS_BEARER_TOKEN: '88fe4dfd73f78214ad4f9e978b100dd40e233be79c8c3ce88d86b3f2419bcdc3',
    },
  },
});
