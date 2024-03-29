# QA-ICT-OP2022

This project is focus on QA and Tester decides. In this project will include both manual and automate testing which was decided by QA and Tester priciples.

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
npm run build
npm run start
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

# API ENDPOINTS

`/agenda`  
`/evaluation`  
`/register`  
`/stats`
