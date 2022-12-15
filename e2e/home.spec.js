import { test, expect } from '@playwright/test';
import { HomePageObject } from './pageObjects/homePageObject'

let homePage = null;

test.describe('The homepage', () => {

    test.beforeEach(async ({ page }) => {
        homePage = new HomePageObject(page);
        await homePage.goto();        
    });

    test('shows dismissable non-prod warning message', async ({ page }) => {

        await expect(homePage.nonProdWarning).toBeVisible();
        await homePage.dismissNonProdWarning();
        await expect(homePage.nonProdWarning).not.toBeVisible();        
    }); 
    
});