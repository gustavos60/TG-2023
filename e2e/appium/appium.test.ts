import wdio from 'webdriverio';
import {SignInTestIds} from '../../src/screens/signin/SignInConstants';
import {ANDROID_CAPABILITIES, IOS_CAPABILITIES} from './capabilities';
import {byAccessibilityLabel} from './utils';
import {HomeTestIds} from '../../src/screens/home/HomeConstants';

const opts = {
  path: '/wd/hub',
  port: 4723,
};

describe('Appium', () => {
  jest.setTimeout(15000);
  let client: WebdriverIO.Browser;

  beforeAll(async () => {
    const capabilities =
      process.env.PLATFORM === 'android'
        ? ANDROID_CAPABILITIES
        : IOS_CAPABILITIES;

    const options = {
      ...opts,
      capabilities,
    };

    client = await wdio.remote(options);
  });

  afterAll(async () => {
    if (client) {
      await client.deleteSession();
    }
  });

  describe('Authentication', () => {
    it('should login successfully', async () => {
      const emailInput = await client.$(
        byAccessibilityLabel(SignInTestIds.emailInput),
      );
      await emailInput.click();
      await emailInput.sendKeys(['eve.holt@reqres.in']);

      const passwordInput = await client.$(
        byAccessibilityLabel(SignInTestIds.passwordInput),
      );
      await passwordInput.click();
      await passwordInput.sendKeys(['cityslicka']);

      const mainButton = await client.$(
        byAccessibilityLabel(SignInTestIds.mainButton),
      );
      await mainButton.click();

      await client.waitUntil(async () =>
        (
          await client.$(byAccessibilityLabel(HomeTestIds.headerText))
        ).isDisplayed(),
      );

      const homeScreenText = await client.$(
        byAccessibilityLabel(HomeTestIds.headerText),
      );
      expect(await homeScreenText.isDisplayed()).toBeTruthy();
    });

    it('should logout successfully', async () => {
      (await client.$(byAccessibilityLabel(HomeTestIds.signOut))).click();

      await client.waitUntil(async () =>
        (
          await client.$(byAccessibilityLabel(SignInTestIds.welcomeText))
        ).isDisplayed(),
      );

      const welcomeText = await client.$(
        byAccessibilityLabel(SignInTestIds.welcomeText),
      );

      expect(await welcomeText.isDisplayed()).toBeTruthy();
    });
  });
});
