/* This file contains the code to convert Cucumber JSON output into the HTML 
*/

const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "./cypress/cucumberReports",
  reportPath: "cypress/cucumberReports/cucumberHTMLReport",
  openReportInBrowser: true,
  pageTitle: "Cypress Test Report",
  reportName: "UI Functional Test",
  pageFooter: "<div><p><center>This is demo project for cypress automation</center></p></div>",
  displayDuration: true,
  durationInMS: true,
  displayReportTime: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "60",
    },
    device: "Local test machine",
    platform: {
      name: "windows",
      version: "22H2",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Cypress Demo Project" },
      { label: "Release", value: "1.0.0" },
      { label: "Cycle", value: "C1" },
      { label: "Execution Start Time", value: "April 27th 2023, 02:31 PM EST" },
      { label: "Execution End Time", value: "April 27th 2023, 02:42 PM EST" },
    ],
  },
});