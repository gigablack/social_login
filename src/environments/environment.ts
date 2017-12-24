// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBj0ktyw7kHQTRW8vVdGwNLGxYBNkGDYxY',
    authDomain: 'mi-proyecto-de-practica.firebaseapp.com',
    databaseURL: 'https://mi-proyecto-de-practica.firebaseio.com',
    projectId: 'mi-proyecto-de-practica',
    storageBucket: 'mi-proyecto-de-practica.appspot.com',
    messagingSenderId: '599232949656'
  }
};
