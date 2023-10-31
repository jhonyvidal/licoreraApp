// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //start PROD Enviroments
  // apiUrl: 'https://licorera3jjjs.com/api/mobile/',
  // apiUrlV2: 'https://licorera3jjjs.com/',
  //finsh PROD Enviroments

  //start DEV Enviroments
  apiUrl: 'https://dev.licorera3jjjs.com/api/mobile/',
  apiUrlV2: 'https://dev.licorera3jjjs.com/',
  apiGoogleMap: 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=',
  ApiKey:'AIzaSyBsSA1CAEjidYGVeDHfHxnemdHMnCzjvh4',
  //finsh PROD Enviroments
  
  databaseNames:[
    {name:"starter_posts"},
    {name:"starter_employees"},
    {name:"starter_config"},
  ],
  firebase: {
    apiKey: "AIzaSyC7YeM_lFND0ftHHCOrNB6PsFk0xIM_Xs8",
    authDomain: "licorera-3jjjs-12d7e.firebaseapp.com",
    databaseURL: "https://licorera-3jjjs-12d7e.firebaseio.com",
    projectId: "licorera-3jjjs-12d7e",
    storageBucket: "licorera-3jjjs-12d7e.appspot.com",
    messagingSenderId: "648554160671",
    appId: "1:648554160671:web:90d620458d23b7463a2b2a"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
