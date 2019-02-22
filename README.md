# Graphql Pet api Frontend

Graphql Apollo Client example + angular-ngrx-material-starter

## About the Pet api Frontend

The Pet api frontend is an example about angular + graphql apollo client + angular-ngrx-material-starter. This example has all the features of angular-ngrx-material-starter + some added listed below (You can checkout for all features https://github.com/tomastrajan/angular-ngrx-material-starter). 

_New Features_

- Graphql Apollo Client
- Codegen apollo client services for consume the pet api.
- Authentication jwt(log in)
- Create Pet
- Read Pet
- Update Pet
- Delete Pet
- 404 / 401 components
- Infinite Scroll
- Filter for pet search

### Demo
You can check a demo here https://petapidemo.firebaseapp.com (The images are not saved to avoid problems but in local it works).

## Getting started

### Prerequisites

- Node
- Angular Cli

### Clone project

`git clone {repository-URL}`

### Run locally

- `npm install`
- `npm run start`
- Go to `http://localhost:4200/`

### Codegen your graphql api

- You need a copy of you schema server in schema.graphql
- You need .graphqlconfig.yml
- You need codegen.yml here you can change the config of where generate your services and where get the queries and mutations files.
- You need queries or mutations with .graphql extensions for codegen the services (In this project queries/mutations are in src/app/graphql and the generated services are in /src/app/generated).
- For generate the services you should use `npm run graphql`

### Considerations

- This project use ngrx insteaf of apollo client cache (this project disable the cache), if you want to use it you can check the oficial docs of angular client https://www.apollographql.com/docs/angular/


