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

### Methods

- _All parameters for **all** methods are **required**!_
- _All `opts` take a JSON Object structure!_

**Identity API**

`equity.changePassword(opts, callback)`

Parameter | Description 
--- | --- |
merchantId | Your merchant ID
currentPassword | Your current password
newPassword | Your new password

`equity.getToken(opts, callback)`

Parameter | Description 
--- | --- |
username | Merchant Username, provided by Equity Bank
password | Merchant Password, provided by Equity Bank
grant_type | OAuth 2.0 Grant Type - must be 'password'

**Transaction API**

`equity.purcahseAirtime(opts, callback)`

Parameter | Description 
--- | --- |
mobileNumber | Mobile Number For Which To Purchase Airtime
amount | Airtime Amount
reference | Airtime Reference
telco | Network Provider 

`equity.createPayment(opts, callback)`

Parameter | Description 
--- | --- |
mobileNumber | Mobile Number For Which To PSend Money
amount | Amount
description | Transaction Description
type | Type
auditNumber | Audit Number

`equity.paymentStatus(opts, callback)`

Parameter | Description 
--- | --- |
transactionId | TransactionId

`equity.onlineRemit(opts, callback)`

Parameter | Description 
--- | --- |
transactionReference | Transaction Reference
senderName | Sender Name
accountNumber | Account Number
bicCode | BIC CODE
mobileNumber | Mobile Number
walletName | Wallet Name
bankCode | Bank Code
branchCode | Branch Code
countryCode | Country Code
currencyCode | Currency Code
amount | Ammount
paymentType | Payment Type
paymentReferences | Payment References      
remarks | Remarks

## Issues And Contribution

Fork the repository and submit a pull request for whatever change you want to be added to this project. If you have any questions, just open an issue.
