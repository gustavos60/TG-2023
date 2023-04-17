import {device, by, element, expect} from 'detox';
import {SignInTestIds} from '../src/screens/signin/SignInConstants';

describe('Authentication', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id(SignInTestIds.welcomeText))).toBeVisible();
  });

  it('should navigate to Home screen after authenticating', async () => {
    await element(by.id(SignInTestIds.emailInput)).typeText(
      'eve.holt@reqres.in',
    );
    await element(by.id(SignInTestIds.passwordInput)).typeText('cityslicka');
    await element(by.id(SignInTestIds.mainButton)).tap();

    await expect(element(by.text('Home screen'))).toBeVisible();
  });
});
