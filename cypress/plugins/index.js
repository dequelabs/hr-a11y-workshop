const axeDevToolsPlugin = require('@axe-devtools/cypress/dist/plugin');
const Reporter = require('@axe-devtools/reporter').default

module.exports = (on, config) => {
  axeDevToolsPlugin(on)

  on('task', {
    // task to create HTML report
    reportAsHTML: async ({ resultsDir, branding = 'axeDevToolsCypress' }) => {
      reporter = new Reporter(branding, resultsDir)
      await reporter.buildHTML(resultsDir);
      return null
    },
    // task to create CSV report
    reportAsCSV: async ({ resultsDir, branding = 'axeDevToolsCypress' }) => {
      reporter = new Reporter(branding, resultsDir)
      await reporter.buildCSV(resultsDir);
      return null
    },
    // task to create Junit XML report
    reportAsJunit: async ({ resultsDir, branding = 'axeDevToolsCypress' }) => {
      reporter = new Reporter(branding, resultsDir)
      await reporter.buildJUnitXML(resultsDir);
      return null
    }
  })
}