# Application

This repository hosts a dummy application that was created using React-Native for the purpose of comparing different tools for functional GUI tests.

It uses [reqres.in](https://reqres.in) for simulating authentication functionalities and an open API from the [Art Institute of Chicago](https://api.artic.edu/docs/#quick-start) to fetch arts and exhibit them in a list with some search and favorites functionalities.

# CI

The comparisons were done after running the tests in a CI environment using [Bitrise](https://bitrise.io). The five workflows can be found at the `bitrise.yml` file.

# Tools

There are three testing tools implemented in this repository, Detox (android and iOS), Appium (android and iOS) and Calabash-Android.

## Detox

For android, make sure to change the emulator name located at `.detoxrc.js` line 53, to the name of the emulator you have available. Then run the following commands:

Install dependencies (only need to do these steps once)
```
yarn
yarn global add detox-cli react-native-cli
```

Build and run the tests
```
yarn detox:android:build
yarn detox:android
```

For iOS, change the simulator name at `detoxrc.js` line 41 if needed, then run the following commands:

Install dependencies (only need to do these steps once)
```
yarn
yarn global add detox-cli react-native-cli
brew tap wix/brew
brew install applesimutils
bundle install
cd ios && bundle exec pod install && cd ..
```

Build and run the tests
```
yarn detox:ios:build
yarn detox:ios
```

## Appium

For android, change the name of the emulator at `e2e/appium/capabilities.ts` line 12 and the platform version at line 11 if needed.

Install dependencies (only need to do these steps once)
```
yarn
yarn global add appium@next
appium driver install uiautomator2
```

Build the app with
```
yarn android:release
```

Start appium server
```
yarn appium:server
```

Run the tests
```
yarn appium:android
```

For iOS

Install dependencies (only need to do these steps once)
```
yarn
brew tap wix/brew
brew install applesimutils
bundle install
cd ios && bundle exec pod install && cd ..
yarn global add appium@next
appium driver install xcuitest
```

Build the app with
```
yarn ios:release
```

Start appium server
```
yarn appium:server
```

Run the tests
```
yarn appium:ios
```

## Calabash

Make sure to have an emulator opened before running the tests

Install dependencies
```
yarn
bundle install
```

Build the app
```
yarn android:release
```

Run the tests
```
yarn calabash:android
```