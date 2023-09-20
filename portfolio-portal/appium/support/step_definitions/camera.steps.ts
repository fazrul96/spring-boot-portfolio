import { Given, When, Then } from '@wdio/cucumber-framework';
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
    accessDevice: 1, // 0 While using the app, 1 Only this time, Default Dont allow
    shareOption: 'gmail' // gmail, googleDrive, whatsapp
};

let driver: any, cameraPage: any;

Given(/^I am on the camera app$/, async () => {
    driver = await remote(customWdOpts);
    cameraPage = new CameraPage(driver);

    await driver.startActivity(customCapabilities.appPackage, customCapabilities.appActivity);
    await cameraPage.validateTitle();
    await cameraPage.clickTagCheckbox(scenario.tagRememberPhotoLocations);
    await cameraPage.clickNextBtn(scenario);
});

When(/^I take a photo$/, async function () {
    await cameraPage.clickCaptureBtn();
});

When(/^I share it via Gmail$/, async function () {
    await cameraPage.clickGalleryBtn(); // Assuming this leads to the share option
    await cameraPage.clickShareGalleryBtn('gmail'); // Add parameter to your clickShareGalleryBtn method
});