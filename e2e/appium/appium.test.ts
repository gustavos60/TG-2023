import wdio from 'webdriverio';
import {SignInTestIds} from '../../src/screens/signin/SignInConstants';
import {ANDROID_CAPABILITIES, IOS_CAPABILITIES} from './capabilities';
import {byAccessibilityLabel} from './utils';
import {HomeTestIds} from '../../src/screens/home/HomeConstants';
import {SearchTestIds} from '../../src/screens/search/SearchConstants';
import {DetailsTestIds} from '../../src/screens/details/DetailsConstants';

const opts = {
  path: '/wd/hub',
  port: 4723,
};

const validEmail = 'eve.holt@reqres.in';
const validPassword = 'anythingworks';
const favArtId = 258426;
const favArtName = 'Space Lab';

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
      await emailInput.sendKeys([validEmail]);

      const passwordInput = await client.$(
        byAccessibilityLabel(SignInTestIds.passwordInput),
      );
      await passwordInput.click();
      await passwordInput.sendKeys([validPassword]);

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

  describe('Favorites', () => {
    it('should log in the app', async () => {
      const emailInput = await client.$(
        byAccessibilityLabel(SignInTestIds.emailInput),
      );
      await emailInput.click();
      await emailInput.sendKeys([validEmail]);

      const passwordInput = await client.$(
        byAccessibilityLabel(SignInTestIds.passwordInput),
      );
      await passwordInput.click();
      await passwordInput.sendKeys([validPassword]);

      const mainButton = await client.$(
        byAccessibilityLabel(SignInTestIds.mainButton),
      );
      await mainButton.click();

      await client.waitUntil(async () =>
        (
          await client.$(byAccessibilityLabel(HomeTestIds.searchButton))
        ).isDisplayed(),
      );

      const searchButton = await client.$(
        byAccessibilityLabel(HomeTestIds.searchButton),
      );
      expect(await searchButton.isDisplayed()).toBeTruthy();
    });

    it('should navigate to search screen', async () => {
      const searchButton = await client.$(
        byAccessibilityLabel(HomeTestIds.searchButton),
      );
      await searchButton.click();

      await client.waitUntil(async () =>
        (
          await client.$(byAccessibilityLabel(SearchTestIds.input))
        ).isDisplayed(),
      );

      const searchInput = await client.$(
        byAccessibilityLabel(SearchTestIds.input),
      );
      expect(await searchInput.isDisplayed()).toBeTruthy();
    });

    it('should search for art by title and navigate to details screen', async () => {
      const searchInput = await client.$(
        byAccessibilityLabel(SearchTestIds.input),
      );

      await searchInput.click();
      await searchInput.sendKeys([favArtName]);

      await client.waitUntil(async () =>
        (await client.$(byAccessibilityLabel(`Art-${favArtId}`))).isDisplayed(),
      );

      const spaceLabArt = await client.$(
        byAccessibilityLabel(`Art-${favArtId}`),
      );
      await spaceLabArt.click();
      await spaceLabArt.click();

      const detailsHeader = client.$(
        byAccessibilityLabel(DetailsTestIds.header),
      );

      expect((await detailsHeader).isDisplayed()).toBeTruthy();
    });

    it('should add to favorites and see snackbar', async () => {
      const favoriteButton = await client.$(
        byAccessibilityLabel(DetailsTestIds.favoriteButton),
      );
      await favoriteButton.click();

      await client.waitUntil(async () =>
        (
          await client.$(byAccessibilityLabel(DetailsTestIds.closeSnackbar))
        ).isDisplayed(),
      );

      const snackbar = await client.$(
        byAccessibilityLabel(DetailsTestIds.closeSnackbar),
      );
      expect(await snackbar.isDisplayed()).toBeTruthy();
    });

    it('should navigate back to home screen and see favorite icon', async () => {
      const detailsGoBack = await client.$(
        byAccessibilityLabel(DetailsTestIds.goBack),
      );
      await detailsGoBack.click();

      const searchGoBack = await client.$(
        byAccessibilityLabel(SearchTestIds.goBack),
      );
      await searchGoBack.click();

      await client.waitUntil(async () =>
        (await client.$(byAccessibilityLabel(`Fav-${favArtId}`))).isDisplayed(),
      );

      const favoriteItem = await client.$(
        byAccessibilityLabel(`Fav-${favArtId}`),
      );

      expect(await favoriteItem.isDisplayed()).toBeTruthy();
    });

    it('should press favorite icon and navigate to details screen', async () => {
      const favIcon = await client.$(byAccessibilityLabel(`Fav-${favArtId}`));

      await favIcon.click();

      await client.waitUntil(async () =>
        (
          await client.$(byAccessibilityLabel(DetailsTestIds.header))
        ).isDisplayed(),
      );

      const detailsScreenHeader = await client.$(
        byAccessibilityLabel(DetailsTestIds.header),
      );

      expect(await detailsScreenHeader.isDisplayed()).toBeTruthy();
    });

    it('should remove from favorites and see snackbar', async () => {
      const favoriteButton = await client.$(
        byAccessibilityLabel(DetailsTestIds.favoriteButton),
      );
      await favoriteButton.click();

      await client.waitUntil(async () =>
        (
          await client.$(byAccessibilityLabel(DetailsTestIds.closeSnackbar))
        ).isDisplayed(),
      );

      const snackbar = await client.$(
        byAccessibilityLabel(DetailsTestIds.closeSnackbar),
      );
      expect(await snackbar.isDisplayed()).toBeTruthy();
    });

    it('should navigate back to home screen and see no favorites', async () => {
      const backButton = await client.$(
        byAccessibilityLabel(DetailsTestIds.goBack),
      );
      await backButton.click();

      await client.waitUntil(async () =>
        (
          await client.$(byAccessibilityLabel(HomeTestIds.noFavoritesLabel))
        ).isDisplayed(),
      );

      const noFavoritesLabel = await client.$(
        byAccessibilityLabel(HomeTestIds.noFavoritesLabel),
      );
      expect(await noFavoritesLabel.isDisplayed()).toBeTruthy();
    });
  });
});
