// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAaPF6THF2otCotZrq_GTBWtXMUUc76z7o',
    authDomain: 'where-is-reddit.firebaseapp.com',
    databaseURL: 'https://where-is-reddit.firebaseio.com',
    projectId: 'where-is-reddit',
    storageBucket: 'where-is-reddit.appspot.com',
    messagingSenderId: '447853451134'
  }
};
