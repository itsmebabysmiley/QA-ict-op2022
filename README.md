# QA-ICT-OP2022

This project is focus on QA and Tester decides. In this project will include both manual and automate testing which was decided by QA and Tester priciples.  
For unit testing we use JestJs.  
Please see [unit-testing.md](./unit-testing.md) for more details.

# How to run this project

## Pre-requirement

1. You need Docker.
2. You need Node.js
3. You need `.env`

## Getting started

Create `.env` file into your root directory.

```
NEXT_PUBLIC_LIFF_ID=

LINE_LOGIN_CHANNEL_ID=
LINE_MESSAGING_API_CHANNEL_ACCESS_TOKEN=
LINE_MESSAGING_API_CHANNEL_SECRET=

DATABASE_URL=mongodb://root:12345678@mongo:27017/op2022?authSource=admin

API_KEY=
SUPER_PRIVILEGED_API_KEY=
```

## Run with Node.js

1. Change directory to `QA-ict-op2022`.
2. Run following command. It may take some few minutes.

```sh
npm run build # Build the project first.
npm run start # Then run the project.
```
3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run with Docker.

1. Change directory to `QA-ict-op2022`.
2. Run following command. It may take some few minutes.

```sh
docker compose -p ict-op2022 -f docker-compose-local.yml up -d
```
After it finished, you should see something like this.
```sh
Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
[+] Running 4/4
 ⠿ Network ict-op2022_default            Created                                                                                                      0.2s
 ⠿ Container ict-op2022-local-server     Started                                                                                                      3.1s
 ⠿ Container ict-op2022-mongo-express-1  Started                                                                                                      3.5s
 ⠿ Container ict-op2022-mongo-1          Started   
```

3. Check whether container is runing by run the following command.

```sh
docker ps
# CONTAINER ID   IMAGE            COMMAND                  CREATED              STATUS              PORTS                      NAMES
# 1900a81e9d5c   ict-op2022_web   "/nodejs/bin/node ./…"   About a minute ago   Up About a minute   0.0.0.0:3000->3000/tcp     ict-op2022-local-server
# d2a68348b49c   mongo            "docker-entrypoint.s…"   About a minute ago   Up About a minute   0.0.0.0:27017->27017/tcp   ict-op2022-mongo-1
# 1620ddfd8965   mongo-express    "tini -- /docker-ent…"   About a minute ago   Up About a minute   0.0.0.0:8081->8081/tcp     ict-op2022-mongo-express-1

```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Testing

1. Run commands.

```
npm run test # For test suite.
npm run test-coverage # For see the coverage of the code. 
```
# API ENDPOINTS

`/agenda`  
`/evaluation`  
`/register`  
`/stats`

## Just for references, I use 5 hours to install node modules.
```
npm WARN ERESOLVE overriding peer dependency
npm WARN ERESOLVE overriding peer dependency
npm WARN deprecated @npmcli/move-file@1.1.2: This functionality has been moved to @npmcli/fs
npm WARN deprecated source-map-url@0.4.1: See https://github.com/lydell/source-map-url#deprecated
npm WARN deprecated stable@0.1.8: Modern JS already guarantees Array#sort() is a stable sort, so this library is deprecated. See the compatibility table on MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#browser_compatibility
npm WARN deprecated urix@0.1.0: Please see https://github.com/lydell/urix#deprecated
rl#deprecated
npm WARN deprecated sane@4.1.0: some dependency vulnerabilities fixed, support for node < 10 dropped, and newer ECMAScript syntax/features added
npm WARN deprecated querystring@0.2.0: The querystring API is considered Legacy. new code should use the URLSearchParams API instead.
npm WARN deprecated uuid@3.4.0: Please upgrade  to version 7 or higher.  Older versions may use Math.random() in certain circumstances, which is known to be problematic.  See https://v8.dev/blog/math-random for details.
-added 2827 packages, and audited 2828 packages in 5h

431 packages are looking for funding
  run `npm fund` for details

31 vulnerabilities (5 moderate, 25 high, 1 critical)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

```