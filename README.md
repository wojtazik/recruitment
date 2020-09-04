## App running and requirements
To run this app, you must have installes node in min. version 10.
You have to instlal packages using bash command
```bash
    npm install
```
and wait some minutes.
Then use command 

```bash
    npm run start:dev
```
port: 9001

to start app with wepback dev server.

You can also chec and fix codestyle using commands:

```bash
    npm run codestyle-typescript-check
```

```bash
    npm run codestyle-typescript-fix
```

to run unit and functional tests use*
```bash
    npm run test
```
( *tests are configured, but the app does not have any test yet )

App uses Typescript in version 3. You can see more libs which are used in this project in package.json file.