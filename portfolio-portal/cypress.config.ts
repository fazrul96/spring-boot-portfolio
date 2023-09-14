import { defineConfig } from 'cypress';
import fs from 'fs';
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createEsbuildPlugin from "@badeball/cypress-cucumber-preprocessor/esbuild";

// TypeScript types
interface ReportOptions {
  reportDir: string;
  reportTitle: string;
  reportPageTitle: string;
  showPassed: boolean;
  overwrite: boolean;
  html: boolean;
  json: boolean;
  reportFilename: string;
  timestamp: string;
  charts: boolean;
  embeddedScreenshots: boolean;
  inlineAssets: boolean;
  saveAllAttempts: boolean;
}

async function setupNodeEvents(on: any, config: any) {
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  on("after:spec", (spec, results) => {
    if (results && results.video) {
      // Do we have failures for any retry attempts?
      const failures = results.tests.some((test) =>
        test.attempts.some((attempt) => attempt.state === "failed")
      );
      if (!failures) {
        // delete the video if the spec passed and no tests retried
        fs.unlinkSync(results.video);
      }
    }
  });

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

// Configuration settings
const commonSettings = {
  // These settings apply everywhere unless overridden
  // defaultCommandTimeout: 5000,
  // viewportWidth: 1000,
  // viewportHeight: 600,
  // Viewport settings overridden for component tests
  // component: {
  //   viewportWidth: 500,
  //   viewportHeight: 500,
  //   devServer: {
  //     framework: 'create-react-app',
  //     bundler: 'webpack',
  //   },
  // },
};

const reporterOptions: ReportOptions = {
  reportDir: 'cypress/results',
  reportTitle: 'Portfolio React + Spring Boot',
  reportPageTitle: 'Scenario Report',
  showPassed: true,
  overwrite: false,
  html: true,
  json: true,
  reportFilename: "[status]_[datetime]-[name]-report",
  timestamp: "longDate",
  charts: true,
  embeddedScreenshots: true,
  inlineAssets: true,
  saveAllAttempts: false,
};

const phone = '';

const envSettings = {

  local: {
    NODE_ENV: "",
    baseUrl: "",
    username: "",
    password: "",
    phone: phone
  },
};

const e2eSettings = {
  // Command timeout overridden for E2E tests
  specPattern: [
    "cypress/e2e/**/*.js",
    "cypress/e2e/scan/*.ts",
    "cypress/e2e/**/*.feature",
    "cypress/support/step_definitions/**/*.ts",
    "support/commands.ts"
  ],
  projectId: "i5qkmg",
  viewportWidth: 1440,
  viewportHeight: 900,
  defaultCommandTimeout: 100000,
  pageLoadTimeout: 200000, // 200 second
  setupNodeEvents,
};

export default defineConfig({
  ...commonSettings,
  reporter: 'mochawesome',
  reporterOptions,
  env: {
    coldStartEndpoint: "https://pay.arfsd.cyou/api/sit",
    ...envSettings,
  },
  e2e: {
    ...e2eSettings,
    setupNodeEvents,
  },
});