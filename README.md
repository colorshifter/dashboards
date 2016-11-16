# dashboards ![](https://ci.novoda.com/buildStatus/icon?job=dashboards) [![](https://raw.githubusercontent.com/novoda/novoda/master/assets/btn_apache_lisence.png)](LICENSE.txt)

Dashboards server and client using node, angular2 and a dummy Android app.

## Description

This repo contains 3 projects that form the dashboard set up at Novoda:

 - `android-webview-app`: A simple android app that runs on the android devices (connected to TVs) and display the dashboards using a WebView. This app also uses a BroadCast receiver to start after the device reboots and it keeps the screen on so that the device doesn't go to sleep and always shows the dashboards.
 - `angular2-client`: The main front-end done with Angular2. It connects to the server via websockets and it only knows how to show the data it receives for each dashboard, it doesn't know where the data comes from. 
 - `node-server`: The dashboard noidejs back-end. This is the brain of the project and it gets all the data that will be displayed in the dashboards and pushes the data to the clients via websockets.

## Simple usage

To get the server running do:

 - `cd node-server`
 - `npm install`
 - Add a valid config file (see the `node-server` README for this).
 - `npm start`

To get the front-end running do:

 - `cd angular2-client`
 - `npm install -g angular-cli@1.0.0-beta.11-webpack.2 gulp-cli`
 - `npm install`
 - Add a valid config file (see the `angular2-client` README for this).
 - `ng serve`
 - Open a browser `http://localhost:4200/dashboards`

To get the android app running do:

 - `cd android-webview-app`
 - `./gradlew installDebug`
 - Run the app and change the URL to point to your angular2 front end
 
## Links

Here are a list of useful links:

 * We always welcome people to contribute new features or bug fixes, [here is how](https://github.com/novoda/novoda/blob/master/CONTRIBUTING.md)
 * If you have a problem check the [Issues Page](https://github.com/novoda/dashboards/issues) first to see if we are working on it
 * For further usage or to delve more deeply checkout the [Project Wiki](https://github.com/novoda/dashboards/wiki)
 * Looking for community help, browse the already asked [Stack Overflow Questions](http://stackoverflow.com/questions/tagged/support-dashboards) or use the tag: `support-dashboards` when posting a new question
 
