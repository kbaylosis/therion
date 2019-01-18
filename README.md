<img src="https://github.com/kbaylosis/therion/blob/master/therion_h.png?raw=true" width="1200">

An application development framework designed to create an app that runs over the mobile, web, and desktop platforms. This is based on the following projects:

* [create-react-app](https://github.com/facebookincubator/create-react-app)
* [create-react-native-app](https://github.com/react-community/create-react-native-app)
* [electron](https://github.com/electron/electron)
* [express](https://expressjs.com/)
* [GraphQL](https://graphql.org/learn/)

## How do I get set up? #

**Creating the project
**
```
#!shell

git clone git@github.com:kbaylosis/therion.git <project_name>
cd <project_name>

# Install the node modules of each project component
cd <project_name>/server
pnpm install

cd <project_name>/mobile
yarn install

cd <project_name>/web
pnpm install
```

**Running the graphql server
**
```
#!shell

cd <project_path>/server
pnpm start
```

**Running the ios mobile client.
** Attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.
```
#!shell

cd <project_path>/mobile
yarn run ios
```

**Running the android mobile client.** Attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup).

```
#!shell

cd <project_path>/mobile
yarn run android
```

**Running the web client. ** Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```
#!shell

cd <project_path>/web
pnpm start
```

**Running the desktop client
**
```
#!shell

cd <project_path>/web
npm start

### Open another terminal window.

pnpm run desktop
```

## Debugging/Logging #

1. Install the [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
2. Run the app
3. Open the **Redux DevTools** menu in Chrome (find it's icon on the top right corner)
4. Select **Open Remote DevTools**
