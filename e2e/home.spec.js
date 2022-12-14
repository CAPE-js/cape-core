import { test, expect } from '@playwright/test';
import { HomePageObject } from './pageObjects/homePageObject'

test.describe('The homepage', () => {

    test('shows dismissable non-prod warning message', async ({ page }) => {

        const homePage = new HomePageObject(page);
        await homePage.goto();
        await expect(homePage.nonProdWarning).toBeVisible();
        await homePage.dismissNonProdWarning();
        await expect(homePage.nonProdWarning).not.toBeVisible();        
    }); 
    
});