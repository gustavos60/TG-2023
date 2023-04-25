import wdio from 'webdriverio';
import {SignInTestIds} from '../../src/screens/signin/SignInConstants';

const opts = {
  path: '/wd/hub',
  port: 4723,
  capabilities: {
    platformName: 'Android',
    platformVersion: '12',
    deviceName: 'Pixel_4_API_31',
    app: './android/app/build/outputs/apk/release/app-release.apk',
    appPackage: 'com.helloapp',
    appActivity: '.MainActivity',
    automationName: 'UiAutomator2',
  },
};

describe('appium test', () => {
  jest.setTimeout(15000);
  let client: WebdriverIO.Browser;

  beforeAll(async () => {
    client = await wdio.remote(opts);
  });

  afterAll(async () => {
    if (client) {
      await client.deleteSession();
    }
  });

  it('should login successfully', async () => {
    const emailInput = await client.$(`~${SignInTestIds.emailInput}`);
    await emailInput.click();
    await emailInput.sendKeys(['eve.holt@reqres.in']);

    const passwordInput = await client.$(`~${SignInTestIds.passwordInput}`);
    await passwordInput.click();
    await passwordInput.sendKeys(['cityslicka']);

    const mainButton = await client.$(`~${SignInTestIds.mainButton}`);
    await mainButton.click();

    await client.waitUntil(async () =>
      (await client.$('~HomeScreen')).isDisplayed(),
    );

    const homeScreenText = await client.$('~HomeScreen');
    const textValue = await homeScreenText.getText();
    expect(textValue).toBe('Home screen');
  });
});
