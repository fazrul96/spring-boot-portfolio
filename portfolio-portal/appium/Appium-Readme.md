<!-- 
Appium Automation
    Reference : http://appium.io/docs/en/2.1/quickstart/install/
-->

1. Install appium
    npm i --location=global appium
2. Run appium in terminal
    appium
3. Install the UiAutomator2 Driver
    Download and install android studio at https://developer.android.com/studio
    appium driver install uiautomator2
4. Install Appium UI at https://github.com/appium/appium-desktop/releases
5. Appium Inspector Cloud at https://inspector.appiumpro.com/
6. Configure Appium UI:
    ANDROID_HOME : Tools->Android->SDK Manager
    JAVA_HOME : C:\Program Files\Java\jdk-20

    Go to Appium Server GUI -> Advanced
    Server address: localhost
    Port: 4723
    Allow CORP: yes

    Go to Appium Inspector
    Remote host: localhost
    Port: 4723
    Path: /wd/hub

    Allow Unauthorized Certificates

    Desired Capabilities:
    {
        "platformName": "Android",
        "deviceName": "pixel_3a",
        "appPackage": "com.android.settings",
        "appActivity": ".Settings"
    }
7. Start Session

<!-- 
How to run the tests 
    - Using Mocha (Not function due to migrate to cucumber)
    - Using Cucumber (Recommended)
-->

1. cd to your root folder .\portfolio-portal\appium

<!-- Using Mocha -->
2. open terminal & run node .\tests\config\testRunner.js
<!-- Using Cucumber -->
3. open terminal & run npx wdio .\wdio.conf.js