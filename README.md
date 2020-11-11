# Dumap Car Race

This project is create for interview process & knowledge transformation.

- [Angular CLI](https://github.com/angular/angular-cli) version 9.1.6.
- [NodeJS](https://nodejs.org/en/docs/) version 12.16.3

#### Status Of Application

**Development Status is done.

- [X] Create JSON Server Mock API
- [X] Create Angular Application
- [X] Unit & Intergation Testing for Fontend Using Jasmine & Karma
- [X] End To End Testing Using Cypress.

**Development Status is inprogress.

- [X] Create Backend Using NodeJS, Express & Mongoose
- [ ] Unit & Intergation Testing for Fontend
- [ ] Genrate Swagger Contracts
- [ ] Create Docker Image & Push to Artifactory
- [ ] Host the application to any Cloud using CI/CD

### Want to setup in your local?
Please follow below steps:
 - git clone
 `https://github.com/tusharbudhe0302/dump-car-race.git`
 - go to path
 `cd dump-car-race`
 - Install node modules
 `npm install`
 - Start Fake Backend  
 `npm run server`
 - Start Angular Frontend   
 `ng serve`
 
You are good to access and application: http://localhost:4200

### Global modules used for development
 - npm install -g @angular/cli
 - npm install -g json-server
 - npm install -g jest
 - npm install -g nodemon

#### Frontend Unit & Integartion Test
- Usings Jasmine & Karma framework
    `ng test` 
    `ng test --code-coverage=true`
-   100% Code Coverage for Unit Testing.Please Check Path ` coverage/dump-car-race/index.html`

#### Backend Unit & Integartion Test (WIP)
- Usings Jest framework
    `jest test`
    `jest test --code-coverage=true`
- It's still WIP. Still Working

## Running end-to-end tests
 - You Can directly Check Video for e2e testing report
 - Path `cypress/videos`
 - Run `ng e2e` to execute the end-to-end tests via [Cypress](https://www.cypress.io/).