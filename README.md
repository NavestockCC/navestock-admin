# Navestock Admin Website
Website for navestock cricket club https://navestock-admin.firebaseapp.com



## Build

Run `ng build --prod` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

##Environment Setup
1. Create /src/environments/environment.ts and /src/environments/environment.prod.ts add your Firebase and Google maps key configuration:
export const environment = {
  production: false,
  //Firebase config
  firebaseConfig: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  },
  //Google map key
  googleMapKey:{
    apiKey: '<your-key>'
  }
};

##Deploy
1. If you have an existing Firebase project you'd like to deploy, cd to the project's root directory and run: `firebase init`
2. To deploy your site, simply run the following command from your project directory: `firebase deploy`

##GIT
1. Upload changes to GIT
`git push origin master https://github.com/NavestockCC/navestock-admin.git`
