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
);
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
   else {
    console.log(r);
  

```

## Methods

- _All parameters for **all** methods are **required**!_
- _All `opts` take a JSON Object structure!_

## _Identity API_

### `equity.changePassword(opts, callback)`

Parameter | Description 
--- | --- |
`merchantId` | _Your merchant ID_
`currentPassword` | _Your current password_
`newPassword` | _Your new password_

### `equity.getToken(opts, callback)`

Parameter | Description 
--- | --- |
`username` | _Merchant Username, provided by Equity Bank_
`password` | _Merchant Password, provided by Equity Bank_
`grant_type` | _OAuth 2.0 Grant Type - must be 'password'_

## _Transaction API_

### `equity.purcahseAirtime(opts, callback)`

Parameter | Description 
--- | --- |
`mobileNumber` | _Mobile Number For Which To Purchase Airtime_
`amount` | _Airtime Amount_
`reference` | _Airtime Reference_
`telco` | _Network Provider_ 

### `equity.createPayment(opts, callback)`

Parameter | Description 
--- | --- |
`mobileNumber` | _Mobile Number For Which To PSend Money_
`amount` | _Amount_
`description` | _Transaction Description_
`type` | _Type_
`auditNumber` | _Audit Number_

### `equity.paymentStatus(opts, callback)`

Parameter | Description 
--- | --- |
`transactionId` | _TransactionId_

### `equity.onlineRemit(opts, callback)`

Parameter | Description 
--- | --- |
`transactionReference` | _Transaction Reference_
`senderName` | _Sender Name_
`accountNumber` | _Account Number_
`bicCode` | _BIC CODE_
`mobileNumber` | _Mobile Number_
`walletName` | _Wallet Name_
`bankCode` | _Bank Code_
`branchCode` | _Branch Code_
`countryCode` | _Country Code_
`currencyCode` | _Currency Code_
`amount` | _Ammount_
`paymentType` | _Payment Type_
`paymentReferences` | _Payment References_      
`remarks` | _Remarks_

## Issues And Contribution

Fork the repository and submit a pull request for whatever change you want to be added to this project. If you have any questions, just open an issue.
