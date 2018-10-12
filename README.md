# Urly

[![Build Status](https://travis-ci.org/Kornil/urly.svg?branch=master)](https://travis-ci.org/Kornil/personal-website)
[![codecov](https://codecov.io/gh/Kornil/urly/branch/master/graph/badge.svg)](https://codecov.io/gh/Kornil/personal-website)
[![Node.js dependencies badge](https://david-dm.org/kornil/urly.svg)](https://david-dm.org)

## What it is 

Isomorphic React application served from an express backend (SSR), it is deployed on `now` at https://urly.now.sh/ thru travisCi.

Backend is a simple express server, all data is stored in node cache (redis-like).

Frontend is hydrated from the server, uses React as framework, Emotion as Css-in-js library (styled-components fork).

I felt there was no need for state management outside of local, with some basic separation of concerns, the application turns out simpler to read and interact with.

Entire frontend is tested in jest, coverage sits a little bit below 100% as this line is reported not covered https://codecov.io/gh/Kornil/urly/src/master/src/client/App.jsx#L30 but coverage for that can be found here https://github.com/Kornil/urly/blob/master/src/client/App.test.jsx#L60 I suspect it's an issue with jest and sourcemaps, the same code on typescript does not present this issue.


## How to run

Being an isomorphic app, it only requires one command to run, `npm run start--dev` (`start` is used by `now` on deployment).
Application will be available at `http://localhost:8888/`.
This will start both webpack configurations in watch mode and hot module replacement enabled:
- Every change server side will reload the application similarly to nodemon but preserving our node instance, and with it, the cache.
- Every change front-end will reload the components as standard in react-hot-module.


### List of technologies used:

Configuration: Webpack4, Babel7, hot module replacement server & client

Testing, eployment: Jest, Enzyme, Prettier (+ Eslint) on commit hook, TravisCi, Now

Backend: Express, node-cache, React + Emotion (SSR)

Front-end: React, Emotion
