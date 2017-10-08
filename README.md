# Where is Reddit
Where is Reddit is an Angular web app which visualizes active user traffic on Reddit.
This web app has a Firebase backend used to store data about several subreddits in order to
provide some trend data on active users.

This web app is also hosted using Firebase and can be [found here.](https://where-is-reddit.firebaseapp.com/)
[![Build Status](https://travis-ci.org/thomas-crane/where-is-reddit.svg?branch=master)](https://travis-ci.org/thomas-crane/where-is-reddit)

The master branch of this repository is the source code of the app hosted on Firebase. The hosted app is always up to date with this code because the deployment to Firebase occurs when the master branch is updated.

## Getting started.
To get started clone this repo to your computer somewhere.
Open a console window in the directory of the cloned repo and use the command

`npm install`

This will install all dependencies of the project (Angular has a lot, so this might take a long time).

Make sure you also have the Angular CLI installed. You can use `ng --version` to see if it is installed.
If it is not installed you can install it by using the command

`npm install -g @angular/cli`

## Running the web app locally.
Run `ng serve` to build and run the web app. Open a browser and navigate to `http://localhost:4200` to see the app.
The app will rebuild if changes are made to the source code.

## Building the web app.
Run `ng build` to build the web app. The build will go into the `dist/` directory.
Because Angular is a JavaScript framework, the compiled web app can be hosted on a static hosting service (such as Firebase).

## What the web app is built with.
Where is Reddit is an Angular project using TypeScript, HTML and Sass. It uses a few JavaScript libraries such as Chart.js and Moment.js.
This project also uses components and styles from [Angular Material2](https://github.com/angular/material2/blob/master/README.md).

## Contributing.
When contributing to this repository keep in mind that the code on the master branch is the same code running on the live website, so any changes to master should be treated as direct changes to production.

Because of this it is recommended that commits are made to a development branch which can then be merged with the master branch when the changes are stable.

Commit messages should follow the same conventions as the Angular Commit Message Guidelines which are as follows:
```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

The Angular guidelines also provide some examples

```
docs(changelog): update change log to beta.5
```
```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

This repo includes `.editorconfig` and `tslint.json` files. These files are associated with plugins which are used to help keep formatting consistent. The formatting rules will automatically be enforced if you are using an IDE which supports these plugins. [Visual Studio Code](https://code.visualstudio.com/) is recommended because it has support for both Editor Config and TS Lint, as well as being a generally good IDE to use for web development.

## Further help.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).