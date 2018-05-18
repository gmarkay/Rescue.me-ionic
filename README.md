# Rescue.me-ionic
Rescue.me is an Ionic V1 Mobile application built for android leveraging Cordva plugins, and google maps API. 
Using Rescue.me users with car troubles can request aid by pinning their location via google maps. Users within five miles
will be notified, and given the option to rescue the stranded motorist



## Technologies
 
 - Angularjs
 
 - Ionic V1
 
 - Google maps API
 
 - ng-cordova
 
 - facebook OAUTH

 
  
  ### If you would like to run Rescue.me locally, follow these instructions 
  ```
  $ https://github.com/gmarkay/Rescue.me-ionic.git
  $ npm install -g cordova ionic
  $ npm intall
  $ ionic cordova platform add android
  
  $ionic cordova build android
  
  If you have an android device, you should enable developer mode via these instructions:
  https://www.digitaltrends.com/mobile/how-to-get-developer-options-on-android/
  then plug it into you computer and run
  $ ionic cordova run android
  
  If you do not have an android device, you will have to install Android Studio, Java JDK Android SDK tools, and Gradle, 
  then add these tools to your PATH
  
  Follow these instructions to install necessy tools
  
  https://ionicframework.com/docs/intro/deploying/
  then run 
  $ionic cordova emulate android, to run on your target emulator
  
You will also need to clone and run the accompanying Rescue.me node.js server which can be found here

https://github.com/gmarkay/Rescue.me-server

```  
