# Athenia Angular App Upgrade Guide

To upgrade from previous version of Athenia please check each version number listed below step by step.

## 0.6.0

Production ready! This update fixes some bugs in the production scripts, and also adds a new page model. The following files will need to be copied over.

* angular.json - Fixed production output directory
* build.xml - Fixed build path
* package.json - Added command for running tests without visual chrome
* src/app/models/page.ts - New Model
* src/app/models/page.spec.ts - New Test
* src/app/services/data-services/user.service.ts - Added contacts functions
* src/app/pages/user/user.page.ts - Fixed a couple things for user service change

## 0.5.0

A fairly substantial one. This update is an internal change that makes it so that all internal calls to the user service getMe are not returning a promise with the logged in user. This makes it completely unnecessary to load the user from any other context. To complete this update copy over the following paths.

* src/app/services/data-services/user.service.ts - The getMe function has been completely reworked.
* src/app/services/data-services/user.service.spec.ts - The test has been updated to account for the requests being injected, and the change in structure.
* src/app/pages/contacts/contacts.page.ts - This page's init has been updated to handle the promise properly.
* src/app/pages/thread/thread.page.ts - This page's init has been updated to handle the promise properly.
* src/app/pages/threads/threads.page.ts - This page's init has been updated to handle the promise properly.
* src/app/pages/user/user.page.ts - This page's init has been updated to handle the promise properly.
* src/app/services/requests/social/social.ts - Fixed a couple potential bugs

## 0.4.0

Simple little one! This update simply adds a apache ant build file. To complete this update simply copy over `build.xml`.

## 0.3.0

Quick little improvement of how requests are handled and how the auth is updated. To complete this update copy over the following files.

* src/app/services/auth-manager/auth-manager.service.ts - Added new observer for when the auth token is updated.
* src/app/services/request-handler/request-handler.service.ts - added new order variable to get request, and triggered the auth refresh subscriber properly

## 0.2.3

Another quick little bug fix! Simply copy over `angular.json` and `src/app/pages/user/user.page.html` to fix a couple of issues.

## 0.2.2

This simply fixes an issue in the `array-helpers.service.spec.ts` file.

## 0.2.1

Simple style guide clean up. This update brings all of the code into the style code outlined in .editorconfig. To run this update copy over the following files.

* src/app/components/logged-in-template/logged-in-template.component.scss
* src/app/components/side-bar/side-bar.component.scss 
* src/app/pages/contacts/contacts.page.html
* src/app/pages/threads/threads.page.html
* src/index.html
* src/main.ts
* src/styles.scss
* src/test.ts

Then updated environment config to make sure they have the proper code style.

## 0.2.0

First things first! Change the editor config to 4 spaces, and then run the code cleanup on the src, and assets directory to make sure the spacing is consistent.

After that copy over and register the components `logged-in-template`, and `side-bar`. Then once that is complete you will new to update all logged in pages to use the new logged in template.
