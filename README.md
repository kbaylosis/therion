<img src="https://github.com/kbaylosis/therion/blob/master/therion_h.png?raw=true" width="400">

An application development framework designed to create an app that runs over the mobile, web, and desktop platforms. This is based on the following projects:

* [create-react-app](https://github.com/facebookincubator/create-react-app)
* [create-react-native-app](https://github.com/react-community/create-react-native-app)
* [electron](https://github.com/electron/electron)
* [express](https://expressjs.com/)
* [GraphQL](https://graphql.org/learn/)

## How do I get set up? #

**Creating the project**
```
#!shell

git clone git@github.com:kbaylosis/therion.git <project_name>
cd <project_name>

# Install the node modules of each project component
cd <project_name>/server
yarn install

cd <project_name>/mobile
yarn install

cd <project_name>/web
yarn install
```

**Configure the test database**
NOTE: The base configuration assumes a postgres database. Other supported databases are: mysql, mariadb, mssql, and sqlite. See [sequelize](https://sequelize.org/master/manual/getting-started.html) for more info.

Run these on the postgres cli:
```
CREATE DATABASE therion;
CREATE USER test WITH createdb;
ALTER USER test WITH password 'test';
GRANT all ON database therion TO test;
```

If you want to vary the configuration edit the items in: server/src/datastore.js

```
development: {
    dialect: "postgres", /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    host: "localhost",
    name: "therion",
    username: "test",
    password: "test",
},
```


**Running the graphql server**
```
#!shell

cd <project_path>/server
yarn start
```

**Running the ios mobile client.**
Attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.
```
#!shell

cd <project_path>/mobile
yarn run ios
```

**Running the android mobile client.**
Attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup).

```
#!shell

cd <project_path>/mobile
yarn run android
```

**Running the web client.**
Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

```
#!shell

cd <project_path>/web
yarn start
```

**Running the desktop client**
```
#!shell

cd <project_path>/web
yarn start

### Open another terminal window.

yarn run desktop
```

## Debugging/Logging #

1. Install the [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
2. Run the app
3. Open the **Redux DevTools** menu in Chrome (find it's icon on the top right corner)
4. Select **Open Remote DevTools**
