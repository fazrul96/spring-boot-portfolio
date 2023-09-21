class CameraPage {
    private driver: any;

    constructor(driver: any) {
        this.driver = driver;
    }

    async validateTitle(): Promise<void> {
        const titleElement: any = await this.driver.$('//android.widget.TextView[text="Remember photo locations?"][0]');
        // await titleElement.waitForDisplayed({ timeout: 10000 });
        await titleElement.isExisting();
    }

    async clickTagCheckbox(tagRememberPhotoLocations = true): Promise<void> {
        if (!tagRememberPhotoLocations) {
            const tagCheckbox: any = await this.driver.$('//android.widget.CheckBox[@resource-id="com.android.camera2:id/check_box"]');
            await tagCheckbox.click();
        }
    }

    async clickAccessDeviceBtn(scenario: { preciseLocation: boolean; accessDevice: number }): Promise<void> {
        let preciseLocation: boolean, accuracyBtn: any, accessDevice: number, accessDeviceBtn: any;

        preciseLocation = scenario.preciseLocation;
        accessDevice = scenario.accessDevice;

        if (preciseLocation) {
            accuracyBtn = await this.driver.$('//android.widget.RadioButton[@resource-id="com.android.permissioncontroller:id/permission_location_accuracy_radio_fine"]');
        } else {
            accuracyBtn = await this.driver.$('//android.widget.RadioButton[@resource-id="com.android.permissioncontroller:id/permission_location_accuracy_radio_coarse"]');
        }
        await accuracyBtn.click();

        switch (accessDevice) {
            case 0:
                accessDeviceBtn = await this.driver.$('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_foreground_only_button"]');
                break;

            case 1:
                accessDeviceBtn = await this.driver.$('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_allow_one_time_button"]');
                break;

            default:
                accessDeviceBtn = await this.driver.$('//android.widget.Button[@resource-id="com.android.permissioncontroller:id/permission_deny_button"]');
                break;
        }

        await accessDeviceBtn.click();
    }

    async clickNextBtn(scenario: any): Promise<void> {
        const nextBtn: any = await this.driver.$('//android.widget.Button[@resource-id="com.android.camera2:id/confirm_button"]');
        await nextBtn.click();

        if (scenario.tagRememberPhotoLocations) {
            await this.clickAccessDeviceBtn(scenario);
            console.log('Clicked on the Access Device button.');
        }
    }

    async clickCaptureBtn(): Promise<void> {
        // const captureBtn = await driver.waitForElementByAccessibilityId('Shutter button');
        const captureBtn: any = await this.driver.$('//android.widget.ImageView[@resource-id="com.android.camera2:id/shutter_button"]');
        await captureBtn.click();
    }

    async clickGalleryBtn(): Promise<void> {
        const galleryBtn: any = await this.driver.$('//android.view.View[@resource-id="com.android.camera2:id/rounded_thumbnail_view"]');
        await galleryBtn.click();
    }

    async clickGalleryDetailsBtn(): Promise<void> {
        const galleryDetailsBtn: any = await this.driver.$('//android.widget.ImageButton[@content-desc="More options"]');
        await galleryDetailsBtn.click();

        const galleryDetails: any = await this.driver.$('//android.widget.TextView[@resource-id="android:id/title"]');
        await galleryDetails.click();

        const closeGalleryDetails: any = await this.driver.$('//android.widget.Button[@resource-id="android:id/button1"]');
        await closeGalleryDetails.click();
    }

    async clickShareGalleryBtn(shareOption: string): Promise<void> {
        const shareGalleryBtn: any = await this.driver.$('//android.widget.ImageButton[@resource-id="com.android.camera2:id/filmstrip_bottom_control_share"]');
        await shareGalleryBtn.click();

        switch (shareOption) {
            case 'Gmail':
            case 'Drive':
                const shareBtn: any = await this.driver.$(`//android.widget.TextView[@resource-id="android:id/text1" and @text="${shareOption}"]`);
                await shareBtn.click();
                break;
            default:
                console.error('Invalid share option:', shareOption);
                break;
        }
    }

    async clickEditBtn(): Promise<void> {
        const editBtn: any = await this.driver.$('//android.widget.ImageButton[@resource-id="com.android.camera2:id/filmstrip_bottom_control_edit"]');
        await editBtn.click();
    }

    async clickDeleteBtn(): Promise<void> {
        const deleteBtn: any = await this.driver.$('//android.widget.ImageButton[@resource-id="com.android.camera2:id/filmstrip_bottom_control_delete"]');
        await deleteBtn.click();
    }

    async clickBackBtn(): Promise<void> {
        const backBtn: any = await this.driver.$('//android.widget.ImageButton[@content-desc="Navigate up"]');
        await backBtn.click();
    }
}

export default CameraPage;