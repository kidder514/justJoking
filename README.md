## Main tasks


### release Note
- in android/app/build/gradle, change android.defaultConfig.versionName to the current version number
- in android/app/build/gradle, change android.defaultConfig.versionCode to +1
- in config.js file, change currentVersion to current version number
- edit release note
- run "npm run android-build:release" to build apk
- upload APK to android developer console
- after the update has appeared in app store, change the version number in firebase

### to be added
- share button
- localization
- hide not displayed image after vertical sliding
- try change app name
- check all page and change them to scrollview
- 刷新并且剪裁list的时候，会有跳动
- comment order by likes
- after adding comment, it might take a while to show up
- dowload button
- likes button too slow
- image size in image gallery should be full width
- optimise things for tablet and bigger screen, now your icon and things looks tiny on them.
- firebase -> production -> Cloud Firestore -> Set spending limits , check this out before it is too late

### Features in release 1.2.0
- push notification
- geolocation public

## Features in release 1.3.0
- clean Cache
- check update

## Features in release 1.4.0
- Video support

## Features in release 1.5.0
- App store optimization
- subscription feature

## Features in release 1.6.0
- help page faq and contact us page
- better avatar support

## Features in release 1.7.0
- share profile support

## Features in release 1.8.0
- add IOS target

### Features backlog
- Link to webview
- online user management
- online forum
- search Page
- Inbox
- second layer commet

# Release Notes

## 0.1 release notes
- splash screen
- check update
- sing in
- sign up
- google sign in
- facebook sign in
- sign out
- image post list
- hot post list
- text post list
- like and unlike
- comment
- like and unlike comment
- author page
- post detail page
- post gallery
- upload post
- setting page
- change avatar
- change user name
- change user tagline
- help page
- check application version
- term and condition page

## 0.11 release notes
- crashlytics
- add deeplinking to play store

## 0.12 release notes
- add version display in setting page.
- fix load bottom text
- remove dislike button
- add google admob ads as fallback

## 0.13 release notes
- long image support message
- optimise the image viewer