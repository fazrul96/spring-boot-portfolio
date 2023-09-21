exports.config = {
    runner: process.env.TEST_ENV,
    port: parseInt(process.env.APPIUM_PORT),
    specs: [
        './e2e/features/*.feature'
    ],
    maxInstances: 10,
    capabilities: [{
        path: process.env.APPIUM_PATH,
        platformName: process.env.PLATFORM_NAME,
        // browserName: process.env.BROWSER_NAME,
        deviceName: process.env.DEVICE_NAME,
        automationName: process.env.AUTOMATION_NAME
    }],
    logLevel: process.env.LOG_LEVEL,
    bail: 0,
    baseUrl: '',
    waitforTimeout: 10000,
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    services: ['appium'],
    framework: 'cucumber',
    reporters: ['spec', ['allure', {
        outputDir: './allure/allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
    }]],
    cucumberOpts: {
        // <string[]> (file/dir) require files before executing features
        require: ['./support/step_definitions/*.steps.ts'],
        // <boolean> show full backtrace for errors
        backtrace: false,
        // <string[]> ("extension:module") require files with the given EXTENSION after requiring MODULE (repeatable)
        requireModule: [],
        // <boolean> invoke formatters without executing steps
        dryRun: false,
        // <boolean> abort the run on first failure
        failFast: false,
        // <boolean> hide step definition snippets for pending steps
        snippets: true,
        // <boolean> hide source uris
        source: true,
        // <boolean> fail if there are any undefined or pending steps
        strict: false,
        // <string> (expression) only execute the features or scenarios with tags matching the expression
        tags: '@SmokeTest', // '@SmokeTest or @SanityTest'
        // <number> timeout for step definitions
        timeout: 60000,
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false
    }
}