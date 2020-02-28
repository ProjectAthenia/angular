# Athenia Angular App Upgrade Guide

To upgrade from previous version of Athenia please check each version number listed below step by step.

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

First things first! Change the editor config to 2 spaces, and then run the code cleanup on the src, and assets directory to make sure the spacing is consistent.

After that copy over and register the components `logged-in-template`, and `side-bar`. Then once that is complete you will new to update all logged in pages to use the new logged in template.
