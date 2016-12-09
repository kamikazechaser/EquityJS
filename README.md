[![npm](https://img.shields.io/npm/v/equityjs.svg?style=flat-square)](https://www.npmjs.com/package/equityjs)
[![Travis](https://img.shields.io/travis/kamikazechaser/EquityJs.svg?style=flat-square)](https://travis-ci.org/kamikazechaser/EquityJs)
[![Coverage Status](https://img.shields.io/coveralls/kamikazechaser/EquityJs.svg?style=flat-square)](https://coveralls.io/github/kamikazechaser/EquityJs?branch=master)
[![Telegram](http://img.shields.io/badge/Telegram-@kamikazechaser-00aced.svg?style=flat-square)](https://telegram.me/kamikazechaser)
[![npm](https://img.shields.io/npm/l/equityjs.svg?style=flat-square)](https://github.com/kamikazechaser/EquityJs/blob/master/LICENSE)


> 🏛 EquityJs

A light Node.js Library For The Equity Bank's Eazzy API

> Documentation
 

## Installation

```bash
$ npm install equityjs --save
```

## Usage

```js

const Equity = require('equityjs');

const equity = new Equity({
  consumerKey: 'YOUR_CONSUMER_KEY',
  consumerSecret: 'YOUR_CONSUMER_SECRET'
});
```

Both are **required** parameters. You can obtain your keys from [here](https://developers.equitybankgroup.com/user/me/apps), by creating an app.

Refer to [examples.js](https://github.com/kamikazechaser/EquityJs/blob/master/examples.js) for more usage indformation.

## API

All Sandbox Endpoints are supported at the moment. In-production Endpoints will be added soon.

Callback from API calls return 2 parameters, that is:

- error
- response 

_The response is always the original JSON Object sent by the Equity API_

An example of a callback function:

```js
function callback (e, r) {
  if (e) {
    console.error(e);
  } else {
    console.log(r);
  }
}```

### Methods

- _All parameters are **required**!_
- _All `opts` take a JSON Object structure!_

**Identity API**

`equity.changePassword(opts, callback)`

Parameter | Description 
--- | --- |
merchantId | Your merchant ID
currentPassword | Your current password
newPassword | Your new password

