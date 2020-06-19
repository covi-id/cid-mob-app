<div align="center">
    <img src="./imgs/logo-dark.png">
</div>
<h3>
    Covi-ID is an open source risk management tool designed to protect privacy.
</h3>

---

# Mobile App

# Index

#### [Documentation](https://github.com/covi-id/cid-documentation)

#### [Project Details](#project-details)

- [Getting started](#getting-started)
- [Learn More About React Native App](#learn-more-about-react-native-app)

This repository is for the web app of [Covi-ID](https://coviid.me/).

The other implementation repositories can be found here:

#### [> `API Core`](https://github.com/covi-id/cid-api-core)

#### [> `Web App`](https://github.com/covi-id/cid-web-app)

Additional Documentation can be found here:

#### [> `Documentation`](https://github.com/covi-id/cid-documentation)

##### [> `End Points Documentation`](https://github.com/covi-id/cid-documentation/blob/master/end_points.md)

---

# Project Details

## Getting Started

In the project directory:

#### 1. `yarn install`

#### 2. `cd ios && pod install`

## Setting up environment:

Create an `env/` folder in the `src/` directory
Create 3 files in the `env/` folder
`dev.json`
`staging.json`
`prod.json`

with the contents
`{ "API_URL": "YOUR_API_URL_HERE", "API_KEY": "YOUR_API_KEY_HERE" }`

## Setting up Google services:

This project has been configured with Firebase for logging.
In short, you will need to create a Firebase app with the same app ID as in this project and then add the relevant google-services.json and GoogleService-Info.plist files to the project.
Please refer to [https://rnfirebase.io/](https://rnfirebase.io/) for setting up a new account and adding the files. You do not need to modify any code nor install any dependencies as this has already been configured.

## Setting up CodePush:

This project has been configured with Microsoft CodePush to allow for easy over-the-air updates.
You will need to create an account on appcenter.ms, setup the Android and iOS apps. Then add a `Dev`, `Staging` and `Prod` deployment to Distribute > CodePush via appcenter for the newly created apps.
These deployment keys will need to be added to your OSX keychain as a password. Alternatively, you can set the keys in the `app/build.gradle` in place of `getPassword`
The keychain password configuration is as follows:
dev:

- Name: android_coviid_codepush_dev
- Account: Admin
- Password: `YOUR_DEV_DEPLOYMENT_KEY`

staging:

- Name: android_coviid_codepush_staging
- Account: Admin
- Password: `YOUR_STAGING_DEPLOYMENT_KEY`

prod:

- Name: android_coviid_codepush_prod
- Account: Admin
- Password: `YOUR_PROD_DEPLOYMENT_KEY`

For iOS, you will need to add the deployment key to your Info.plist as `CodePushDeploymentKey`, you will have to change to this the desired deployment key when generating a new build.

Please refer to [https://docs.microsoft.com/en-us/appcenter/distribution/codepush/](https://docs.microsoft.com/en-us/appcenter/distribution/codepush/) for official CodePush documentation.

## To run iOS:

`yarn ios:dev`
`yarn ios:staging`
`yarn ios:prod`

## To run Android:

`yarn android:dev`
`yarn android:staging`
`yarn android:prod`

## Deploying iOS:

Set the desired deployment key in Info.plist
See [https://reactnative.dev/docs/running-on-device#building-your-app-for-production](https://reactnative.dev/docs/running-on-device#building-your-app-for-production)
Follow the general iOS app store submission approach for deploying to TestFlight and the store.
To generate an .ipa file, you can configure an adhoc profile on the Apple developer portal and then create an adhoc distribution via XCode.

## Deploying Android:

This project has been configured to securely store keystore passwords in your OSX keychain.
Please refer to [https://reactnative.dev/docs/signed-apk-android](https://reactnative.dev/docs/signed-apk-android) for generating the `.keystore` file. You will need to then add the password you used to your OSX keychain using the name `android_coviid_keystore` and account `Admin`. Refer to the android `build.gradle` for usage on `getPassword`. You can of course, remove this getPassword function and follow the standard guide for setting up a keystore file.

To generate a release .apk, append `:release` to the run scripts
To generate a .aab bundle, append `:bundle` to the run scripts

### Learn More About React Native App

You can learn more in the [React Native App documentation](https://reactnative.dev/docs/getting-started).
