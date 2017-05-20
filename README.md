# Therion #

An application development framework designed to create an app that runs over the mobile, web, and desktop platforms. This is based from the [create-react-app](https://github.com/facebookincubator/create-react-app),
 [create-react-native-app](https://github.com/react-community/create-react-native-app), and [electron](https://github.com/electron/electron) projects.

## How do I get set up? #

**Creating the project
**
```
#!shell

git clone git@bitbucket.org:zoog/therion.git <project_name>
cd <project_name>

```

**Running the ios mobile client.
** Attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.
```
#!shell

cd <project_path>/clients/mobile
npm run ios
```

**Running the android mobile client.** Attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup).

```
#!shell

cd <project_path>/clients/mobile
npm run android
```

**Running the web client. ** Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```
#!shell

cd <project_path>/clients/web
npm start
```

**Running the desktop client
**
```
#!shell

cd <project_path>/clients/web
npm start

### Open another terminal window.

npm run desktop
```

## Debugging/Logging #

1. Install the [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
2. Run the app
3. Open the Redux DevTools menu in Chrome (find it's icon on the top right corner)
4. Select **Open Remote DevTools**