class NetworkInternetPage {
    private driver: any;

    constructor(driver: any) {
        this.driver = driver;
    }
    
    async clickNetworkInternetOption() {
        const networkInternetOption = await this.driver.$('//android.widget.TextView[@text="Network & internet"]');
        await networkInternetOption.click();
    }

    async toggleAirplaneMode() {
        const airplaneModeButton = await this.driver.$('//android.widget.Switch');
        await airplaneModeButton.click();
    }
}

export default NetworkInternetPage;