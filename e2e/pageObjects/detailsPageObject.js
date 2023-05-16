import { buildRecordUrl } from "../testSiteUrls";
import { BasePageObject } from "./basePageObject";

export class DetailsPageObject extends BasePageObject {

    constructor(page) {
        super(page);

        this.nextLink = page.getByRole('link').filter({ hasText: 'Next ➡️' });
        this.previousLink = page.getByRole('link').filter({ hasText: '⬅️ Previous' });
    }

    async goto(recordNumber) {
        const address = buildRecordUrl(recordNumber);
        await this.page.goto(address);
    }

    async getCardTitleText() {
        return await this.page.locator(".card-title").first().innerText();
    }

    async getFieldValueText(index) {
        return await this.page.locator(".cape-field-value").nth(index).innerText();
    }

    async getRecordNumberText() {
        return await this.getFieldValueText(0);
    }

    async getDateText() {
        return await this.getFieldValueText(1);
    }

    async getTitleText() {
        return await this.getFieldValueText(2);
    }

    async getSizeText() {
        return await this.getFieldValueText(3);
    }

    async getColourText() {
        return await this.getFieldValueText(4);
    }

    async getThreeCharColourText() {
        return await this.getFieldValueText(5);        
    }

    async getWeightText() {
        return await this.getFieldValueText(6);
    }

    async getLikesText() {
        return await this.getFieldValueText(7);
    }

    async getFoodText() {
        return await this.getFieldValueText(8);
    }

    async getDrinksText() {
        return await this.getFieldValueText(9);
    }
}