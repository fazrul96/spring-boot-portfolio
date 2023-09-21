import { Before, After, Given, When } from '@wdio/cucumber-framework';
// import { expect, $ } from '@wdio/globals';
import { remote } from 'webdriverio';
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
    await driver.startActivity(customCapabilities.appPackage, customCapabilities.appActivity);
    await cameraPage.validateTitle();
    await cameraPage.clickTagCheckbox(scenario.tagRememberPhotoLocations);
    await cameraPage.clickNextBtn(scenario);
});

When(/^I take a photo$/, async function () {
    await cameraPage.clickCaptureBtn();
});

When(/^I share it via "([^"]*)"$/, async function (fileService: string) {
    await cameraPage.clickGalleryBtn();
    await cameraPage.clickShareGalleryBtn(fileService);
});