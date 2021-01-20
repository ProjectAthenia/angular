# Athenia Angular App Upgrade Guide

To upgrade from previous version of Athenia please check each version number listed below step by step.

## 0.10.0

Big update! This update completely reworks

* src/app/app-routing.module.ts - A new route was added pointing to the subscription page with a feature passed in, and the existing organization subscription route was renamed
* src/app/components/overlay-window/
* src/app/components/subscription-upgrade-required-window/
* src/app/components/components.module.ts
* src/app/models/feature.spec.ts
* src/app/models/feature.ts
* src/app/models/subscription/membership-plan.spec.ts
* src/app/models/subscription/membership-plan.ts
* src/app/pages/organization-creation/organization-creation.page.ts
* src/app/pages/subscription/subscription.page.html
* src/app/pages/subscription/subscription.page.ts
* src/app/services/data-services/subscription.service.spec.ts
* src/app/services/data-services/subscription.service.ts
* src/app/services/requests/auth/auth.ts
* src/app/services/requests/features/
* src/app/services/requests/requests.service.ts
* src/app/services/requests/subscriptions/subscriptions.ts
* src/environments/environment.prod.ts
* src/environments/environment.ts

## 0.9.0

This updates makes some minor changes to the asset class to make it easier to use, and it also fixes some bigs with the last update.

* src/app/models/asset.ts - Added some helper functions, and changed the url get and setting to be intelligent
* src/app/pages/ballot/ballot.module.ts - Fixed naming bug
* src/app/pages/ballot/ballot.page.ts - Fixed naming bug
* src/app/services/requests/subscriptions/subscriptions.ts - Fixed entity reference

## 0.8.0

Voting stuff! This update adds the ability for someone to vote on a ballot through this app.

* src/app/app-routing.module.ts - Registered new ballot page
* src/app/components/ballot-item/ - New Component
* src/app/components/ballot/ - New Component
* src/app/components/components.module.ts - Registered new components
* src/app/models/vote/ - New Models section
* src/app/pages/ballot/ - New Page
* src/app/services/requests/voting/ - New Requests group

## 0.7.0 

Massive update! Not only does this add a ton of new features, but it also fixes a number of issues with ionicon and misceallanous pieces. To finish this update, make the following changes.

* angular.json - Added settings needed for new ionicons
* package.json - Updated ionicons, and added stripe-angular
* src/app/app-routing.module.ts - Added a bunch of new routes, best to simply copy over the Athenia definitions
* src/app/app.component.ts - Removed Default redirect
* src/app/app.module.ts - Registered stripe module
* src/app/components/menu/ - New Component
* src/app/components/organization-users-management/ - New Component
* src/app/components/components.module.ts - Registered a couple new components, and added custom elements schema.
* src/app/components/logged-in-header/logged-in-header.component.html - Replaced button links with new menu component.
* src/app/components/logged-in-header/logged-in-header.component.spec.ts - Added menu component to declarations
* src/app/components/logged-in-template/logged-in-template.component.spec.ts - Added menu component to declarations
* src/app/components/rating-bar/rating-bar.component.html - Updated ion icon usage to use tag
* src/app/components/rating-bar/rating-bar.component.spec.ts - Added custom schema module
* src/app/components/side-bar/side-bar.component.html - Replaced links with new menu component
* src/app/components/side-bar/side-bar.component.scss - Added a border!
* src/app/components/side-bar/side-bar.component.spec.ts - Imported menu component
* src/app/models/asset.spec.ts - New Test
* src/app/models/asset.ts - New Model
* src/app/models/base-model.ts - This class is now abstract
* src/app/models/entity.ts - New parent class for various models
* src/app/models/organization/organization-manager.spec.ts - New test
* src/app/models/organization/organization-manager.ts - New Model
* src/app/models/organization/organization.spec.ts - New test
* src/app/models/organization/organization.ts - New Model
* src/app/models/user/message.ts - Minor code cleanup
* src/app/models/user/role.spec.ts - New Test
* src/app/models/user/role.ts - New Model
* src/app/models/user/thread.spec.ts - New tests for thread hasUserSeenThread functions
* src/app/models/user/thread.ts - Code cleanup and added hasUserSeenThread function
* src/app/models/user/user.ts - Updated to extend entity, removed any bits related to subscriptions, and added base route function
* src/app/pages/contacts/contacts.module.ts - Imported custom elements schema
* src/app/pages/contacts/contacts.page.html - Updated ionicon to use real element
* src/app/pages/organization-creation/ - New page
* src/app/pages/organization-users-management/ - New Page
* src/app/pages/sign-in/sign-in.page.html - Updated for sign up link if enabled, and changed id
* src/app/pages/sign-in/sign-in.page.scss - Updated for different id, and reworked a lot of style structure
* src/app/pages/sign-in/sign-in.page.ts - Added sign up page integration
* src/app/pages/sign-up/ - New Page
* src/app/pages/subscription/ - New Page
* src/app/pages/user/user.module.ts - Added custom schema
* src/app/pages/user/user.page.html - Updated ionicon references
* src/app/services/data-services/organization.service.spec.ts - New test
* src/app/services/data-services/organization.service.ts - New service
* src/app/services/requests/auth/auth.spec.ts - Removed createPaymentMethod test
* src/app/services/requests/auth/auth.ts - Removed createPaymentMethod function
* src/app/services/requests/entity/ - New Request group
* src/app/services/requests/organization/ - New Request group
* src/app/services/requests/requests.service.ts - Registered new groups
* src/app/services/requests/subscriptions/subscriptions.ts - Updated for entities
* src/assets/styles/classes.scss - Add classes for links, and horizontal pages
* src/assets/styles/elements.scss - Added some customizations for buttons
* src/environments/environment.prod.ts - Added new settings for social media and organizations
* src/environments/environment.ts - Added new settings for social media and organizations
* src/index.html - Added ionicons script
* src/styles.scss - Removed iconicons imports

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
