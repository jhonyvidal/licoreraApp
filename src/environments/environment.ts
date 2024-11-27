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
    apiKey: "AIzaSyDzkFjBcap2-ebxp4IHJ78xD5XqxuAG6_g",
    authDomain: "licorera-tres-jotas-dev.firebaseapp.com",
    databaseURL: "https://licorera-tres-jotas-dev-default-rtdb.firebaseio.com",
    projectId: "licorera-tres-jotas-dev",
    storageBucket: "licorera-tres-jotas-dev.firebasestorage.app",
    messagingSenderId: "83635984357",
    appId: "1:83635984357:web:d6b81023a74c4c7049810c",
    measurementId: "G-9JLW1CPM2G"
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
