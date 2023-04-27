/* This file contains the code to convert Cucumber JSON output into the HTML 
*/

const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "./cypress/cucumberReports",
  reportPath: "cypress/cucumberReports/cucumberHTMLReport",
  openReportInBrowser: true,
  pageTitle: "Test Project",
  reportName: "Functional Test",
  pageFooter: "<div><p>A custom footer in html</p></div>",
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
      { label: "Project", value: "Test Project" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "B11221.34321" },
      { label: "Execution Start Time", value: "Nov 19th 2017, 02:31 PM EST" },
      { label: "Execution End Time", value: "Nov 19th 2017, 02:56 PM EST" },
    ],
  },
});