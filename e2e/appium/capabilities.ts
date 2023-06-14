const IOS_CAPABILITIES = {
  platformName: 'iOS',
  'appium:automationName': 'XCUITest',
  'appium:deviceName': 'iPhone 8',
  'appium:app':
    './ios/build/Build/Products/Release-iphonesimulator/HelloApp.app',
};

const ANDROID_CAPABILITIES = {
  platformName: 'Android',
  'appium:platformVersion': '11',
  'appium:deviceName': 'Pixel_4_API_31',
  'appium:app': './android/app/build/outputs/apk/release/app-release.apk',
  'appium:appPackage': 'com.helloapp',
  'appium:appActivity': '.MainActivity',
  'appium:automationName': 'UiAutomator2',
};

export {ANDROID_CAPABILITIES, IOS_CAPABILITIES};
