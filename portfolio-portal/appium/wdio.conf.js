const allure = require('allure-commandline')

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
    reporters:     
    ['spec', 
    ['allure', {
        outputDir: './allure/allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
        reportedEnvironmentVars: true
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
        tags: '@SanityTest', // '@SmokeTest or @SanityTest' '@TestingTest'
        // <number> timeout for step definitions
        timeout: 60000,
        // <boolean> Enable this config to treat undefined definitions as warnings.
        ignoreUndefinedDefinitions: false
    },
    // Autogenerate Report
    onComplete: function() {
        const reportError = new Error('Could not generate Allure report')
        const generation = allure(['generate', 'allure/allure-results', '--clean', '-o', 'allure/allure-report']);

        return new Promise((resolve, reject) => {
            const generationTimeout = setTimeout(
                () => reject(reportError),
                5000)

            generation.on('exit', function(exitCode) {
                clearTimeout(generationTimeout)

                if (exitCode !== 0) {
                    return reject(reportError)
                }

                console.log('Allure report successfully generated')
                resolve()
            })
        })
    }
}