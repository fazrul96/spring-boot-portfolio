import dotenv from 'dotenv';

dotenv.config();

export const config = {
    timeout: 60000,
    wdOpts: {
        path: process.env.APPIUM_PATH || '',
        port: parseInt(process.env.APPIUM_PORT || '4723'),
        capabilities: {
            platformName: process.env.PLATFORM_NAME || '',
            deviceName: process.env.DEVICE_NAME || '',
        },
    },
    logLevel: process.env.LOG_LEVEL || '',
};