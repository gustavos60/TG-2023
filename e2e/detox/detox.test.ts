import {device, by, element, expect} from 'detox';
import {SignInTestIds} from '../../src/screens/signin/SignInConstants';
import {HomeTestIds} from '../../src/screens/home/HomeConstants';
import {SearchTestIds} from '../../src/screens/search/SearchConstants';
import {DetailsTestIds} from '../../src/screens/details/DetailsConstants';

const favArtId = 258426;
const favArtName = 'Space Lab';

const validEmail = 'eve.holt@reqres.in';
const validPassword = 'anythingWorks';

describe('Authentication', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should have welcome screen', async () => {
    await expect(element(by.id(SignInTestIds.welcomeText))).toBeVisible();
  });

  it('should navigate to Home screen after authenticating and have no favorites', async () => {
    await element(by.id(SignInTestIds.emailInput)).replaceText(validEmail);
    await element(by.id(SignInTestIds.passwordInput)).replaceText(
      validPassword,
    );
    await element(by.id(SignInTestIds.mainButton)).tap();

    await expect(element(by.id(HomeTestIds.noFavoritesLabel))).toBeVisible();
  });

  it('should navigate back to login screen after pressing on sign out', async () => {
    await element(by.id(HomeTestIds.signOut)).tap();
    await expect(element(by.id(SignInTestIds.welcomeText))).toBeVisible();
  });
});

describe('Favorites', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('should log in the app', async () => {
    await element(by.id(SignInTestIds.emailInput)).replaceText(validEmail);
    await element(by.id(SignInTestIds.passwordInput)).replaceText(
      validPassword,
    );
    await element(by.id(SignInTestIds.mainButton)).tap();

    await expect(element(by.id(HomeTestIds.searchButton))).toBeVisible();
  });

  it('should navigate to search screen', async () => {
    await element(by.id(HomeTestIds.searchButton)).tap();

    await expect(element(by.id(SearchTestIds.input))).toBeVisible();
  });

  it('should search for art by title and navigate to details screen', async () => {
    await element(by.id(SearchTestIds.input)).replaceText(favArtName);

    await waitFor(element(by.id(`Art-${favArtId}`)))
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id(`Art-${favArtId}`)).tap();

    await expect(element(by.id(DetailsTestIds.header))).toBeVisible();
  });

  it('should add to favorites and see snackbar', async () => {
    await element(by.id(DetailsTestIds.favoriteButton)).tap();

    await expect(element(by.id(DetailsTestIds.closeSnackbar))).toBeVisible();
  });

  it('should navigate back to home screen and see favorite icon', async () => {
    await element(by.id(DetailsTestIds.goBack)).tap();
    await element(by.id(SearchTestIds.goBack)).tap();

    await expect(element(by.id(`Fav-${favArtId}`))).toBeVisible();
  });

  it('should press favorite icon and navigate to details screen', async () => {
    await element(by.id(`Fav-${favArtId}`)).tap();

    await expect(element(by.id(DetailsTestIds.header))).toBeVisible();
  });

  it('should remove from favorites and see snackbar', async () => {
    await element(by.id(DetailsTestIds.favoriteButton)).tap();

    await expect(element(by.id(DetailsTestIds.closeSnackbar))).toBeVisible();
  });

  it('should navigate back to home screen and see no favorites', async () => {
    await element(by.id(DetailsTestIds.goBack)).tap();

    await expect(element(by.id(HomeTestIds.noFavoritesLabel))).toBeVisible();
  });
});
