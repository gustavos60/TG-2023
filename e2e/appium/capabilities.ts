const IOS_CAPABILITIES = {
  platformName: 'iOS',
  automationName: 'XCUITest',
  deviceName: 'iPhone 12',
  app: './ios/build/Build/Products/Release-iphonesimulator/HelloApp.app',
};

const ANDROID_CAPABILITIES = {
  platformName: 'Android',
  platformVersion: '12',
  deviceName: 'Pixel_4_API_31',
  app: './android/app/build/outputs/apk/release/app-release.apk',
  appPackage: 'com.helloapp',
  appActivity: '.MainActivity',
  automationName: 'UiAutomator2',
};

export {ANDROID_CAPABILITIES, IOS_CAPABILITIES};
