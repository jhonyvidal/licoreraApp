# Ionic Angular Project

This is a project using Angular with Ionic to build a hybrid mobile application.

## Description

The application is a task management platform that allows users to create, edit, and delete tasks. The app also includes basic authentication functionality and uses a mock backend to manage task data.

## Prerequisites

Before you begin, ensure you have installed the following:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) (typically comes with Node.js)
- [Ionic CLI](https://ionicframework.com/docs/cli) (can be installed globally using `npm install -g @ionic/cli`)

# Deploy with Ionic Angular

to deploy on Web mobile change two files "angular.json && src/index.html"
src/index.html >>>> <base href="/mobile/" /> 
angular.json >>> {"options": { "baseHref": "/mobile/",}}


# Installation  to run

npm install

ionic serve: Runs the app in development mode.
ionic build: Compiles the app for production.
ionic capacitor add <platform>: Adds a platform (Android, iOS).
ionic capacitor run <platform>: Compiles and runs the app on a device or emulator.
ionic generate page <page-name>: Generates a new page.
ionic generate component <component-name>: Generates a new component.
ionic generate service <service-name>: Generates a new service.
ionic generate module <module-name>: Generates a new module

ng add @angular/pwa: Adds PWA (Progressive Web App) support to your project.
ng generate component <component-name>: Generates a new Angular component.
ng generate service <service-name>: Generates a new Angular service.
ng generate module <module-name>: Generates a new Angular module.
ng build: Compiles the app for production (this is also used internally by ionic build).
ng test: Runs the unit tests for the project.
ng e2e: Runs the end-to-end tests for the project.