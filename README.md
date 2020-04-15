# auth-log-analyzer

Analyzes `Auth.log` files for you!

## Prerequisites
These are the folloing dependencies:
- NodeJS ^8.9
- npm ^5.6
- vue ^2.5.17
- vue-router ^3.1.6
- vuetify ^2.2.11

The following are devDependencies and are optional:
- @vue/cli ^4.3.1

## Contents
This is a Vue.js web app hosted on Google Firebase that reads auth.log files from the user to extract and display various data from it. 

This project has been created using `vue-cli`, `webpack-simple`, `firebase-tools`

## Project setup
Install necessary dependencies using npm.
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Deploy to Firebase
You need to compile the app for a production environment first and only after can you then deploy it to Firebase.  
This web app only needs Firebase to host.
```
npm run build
firebase deploy --only hosting
```

## Host Vue.js apps in Firebase
To learn how to host Vue.js apps in Firebase, click [here](https://cli.vuejs.org/guide/deployment.html#firebase)!
