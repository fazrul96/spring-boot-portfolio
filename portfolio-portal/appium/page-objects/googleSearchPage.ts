class GoogleSearchPage {
    private driver: any;

    constructor(driver: any) {
        this.driver = driver;
    }

    async navigateToGoogleSearchPage() {
        await this.driver.url('https://www.google.com');
        await this.driver.pause(5000);
    }

    async clickSignInBtn() {
        const signInBtn = await this.driver.$('//android.view.View[@content-desc="Sign in"][1]');
        await signInBtn.waitForClickable({ timeout: 5000 });
        await signInBtn.click();

        const forgotEmailBtn = await this.driver.$('//android.widget.Button[@text="Forgot email?"][0]');
        await forgotEmailBtn.waitForClickable({ timeout: 5000 });
        await forgotEmailBtn.click();

        const nextBtn = await this.driver.$('//android.widget.Button[@text="Next"][0]');
        await nextBtn.waitForClickable({ timeout: 5000 });
        await nextBtn.click();

        await this.driver.pause(5000);
    }
}

export default GoogleSearchPage;  