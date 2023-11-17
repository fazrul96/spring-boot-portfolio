import { Before, After, Given, When, Then } from '@wdio/cucumber-framework';

// import { expect, $ } from '@wdio/globals';
import { remote } from 'webdriverio';
import allureReporter from '@wdio/allure-reporter';
import { config } from '../../support/config';
import NetworkInternetPage from '../../page-objects/networkInternetPage';

const customCapabilities = {
    platformName: config.wdOpts.capabilities.platformName,
    deviceName: config.wdOpts.capabilities.deviceName,
    appPackage: 'com.android.settings',
    appActivity: '.Settings',
    automationName: 'UiAutomator2', // Use UiAutomator2 for Android
};

const customWdOpts = {
    ...config.wdOpts,
    capabilities: customCapabilities,
};

let driver: any, networkInternetPage: any;

Before(async function () {
    driver = await remote(customWdOpts);
    networkInternetPage = new NetworkInternetPage(driver);
});

Given(/^I am on the network and internet settings$/, async () => {
    allureReporter.addStory('I am on the network and internet settings');

    await driver.startActivity(customCapabilities.appPackage, customCapabilities.appActivity);
    await networkInternetPage.clickNetworkInternetOption();
});

When(/^I toggle on Airplane Mode$/, async function () {
    allureReporter.addStory('I toggle on Airplane Mode');

    await networkInternetPage.toggleAirplaneMode();
});

Then(/^Airplane Mode should be enabled$/, async function () {
    allureReporter.addStory('Airplane Mode should be enabled');
    // Verify Airplane Mode 
});

After(async function () {
    allureReporter.addStory('Delete the session');
    await driver.deleteSession();
});