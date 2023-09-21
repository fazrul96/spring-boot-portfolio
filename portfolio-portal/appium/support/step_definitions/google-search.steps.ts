import { Before, After, Given, When, Then } from '@wdio/cucumber-framework';

// import { expect, $ } from '@wdio/globals';
import { remote } from 'webdriverio';
import allureReporter from '@wdio/allure-reporter';
import { config } from '../../support/config';
import GoogleSearchPage from '../../page-objects/googleSearchPage';

const customCapabilities = {
    platformName: config.wdOpts.capabilities.platformName,
    deviceName: config.wdOpts.capabilities.deviceName,
    browserName: 'Chrome',
    automationName: 'UiAutomator2', // Use UiAutomator2 for Android
};

const customWdOpts = {
    ...config.wdOpts,
    capabilities: customCapabilities,
};

let driver: any, googleSearchPage: any;

Before(async function () {
    driver = await remote(customWdOpts);
    googleSearchPage = new GoogleSearchPage(driver);
});

Given(/^I am on the Google search page$/, async () => {
    allureReporter.addStory('I am on the Google search page');
    await driver.startActivity(customCapabilities.browserName);
    await googleSearchPage.navigateToGoogleSearchPage();
});

When(/^I click the Sign-In button$/, async function () {
    allureReporter.addStory('I click the Sign-In button');
    await googleSearchPage.clickSignInBtn();
});

Then(/^I should be on the Google Sign-In page$/, async function () {
    // Verify Airplane Mode 
    allureReporter.addStory('I should be on the Google Sign-In page');
});

After(async function () {
    allureReporter.addStory('Delete the session');
    await driver.deleteSession();
});