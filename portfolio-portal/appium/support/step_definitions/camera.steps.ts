import { Before, After, Given, When } from '@wdio/cucumber-framework';

// import { expect, $ } from '@wdio/globals';
import { remote } from 'webdriverio';
import allureReporter from '@wdio/allure-reporter';
import { config } from '../../support/config';
import CameraPage from '../../page-objects/cameraPage';

const customCapabilities = {
    platformName: config.wdOpts.capabilities.platformName,
    deviceName: config.wdOpts.capabilities.deviceName,
    appPackage: 'com.android.camera2',
    appActivity: 'com.android.camera.CameraLauncher',
    automationName: 'UiAutomator2', // Use UiAutomator2 for Android
};

const customWdOpts = {
    ...config.wdOpts,
    capabilities: customCapabilities,
};

const scenario = {
    tagRememberPhotoLocations: true, // remember photo locations?
    preciseLocation: true, // true = precise, false = approximate
    accessDevice: 1 // 0 While using the app, 1 Only this time, Default Dont allow
};

let driver: any, cameraPage: any;

Before(async function () {
    driver = await remote(customWdOpts);
    cameraPage = new CameraPage(driver);
});

Given(/^I am on the camera app$/, async () => {
    allureReporter.addStory('I am on the camera app');

    await driver.startActivity(customCapabilities.appPackage, customCapabilities.appActivity);
    await cameraPage.validateTitle();
    await cameraPage.clickTagCheckbox(scenario.tagRememberPhotoLocations);
    await cameraPage.clickNextBtn(scenario);
});

When(/^I take a photo$/, async function () {
    allureReporter.addStory('I take a photo');
    await cameraPage.clickCaptureBtn();
});

When(/^I share it via "([^"]*)"$/, async function (fileService: string) {
    allureReporter.addStory('I share it via ' + fileService);
    await cameraPage.clickCaptureBtn();
    await cameraPage.clickGalleryBtn();
    await cameraPage.clickShareGalleryBtn(fileService);
});

After(async function () {
    allureReporter.addStory('Delete the session');
    await driver.deleteSession();
});