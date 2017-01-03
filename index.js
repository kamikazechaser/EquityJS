/**
 * EquityJs
 *
 * A Node.js Library For The Equity Eazzy API
 *
 * Mohammed Sohail <sohailsameja@gmail.com>
 * Released Under AGPL-v3 License
 *
 */

/**
 * Node.js Dependencies
 *
 */
const r = require('needle');
const q = require('querystring');
const c = require('rangi');
const p = require('./package.json');
const fs = require('fs');

/**
 * Load Environmental Variables
 */
require('dotenv').config({
    silent: true
});

/**
 * Equity API endpoints
 *
 * @constant {object}
 *
 */
const endpoint = {
    getToken: '/identity/v1-sandbox/token',
    changePassword: '/identity/v1-sandbox/merchants/',
    purchaseAirtime: '/transaction/v1-sandbox/airtime',
    createPayment: '/transaction/v1-sandbox/payments',
    paymentStatus: '/transaction/v1-sandbox/payments/',
    onlineRemit: '/transaction/v1-sandbox/remittance'
};

/**
 * Custom API Error messages
 *
 * @constant {object}
 *
 */
const error = {
    noKeyAndSecret: 'You need to specify your Equity Consumer Key, Consumer Secret, Username and Password',
    noParam: 'You need to specify your ',
    missingParam: 'You must pass in the required parameters'
};

/**
 * Equity API Defaults
 *
 * @property {string} key
 * @property {string} secret
 * @property {boolean} debug
 *
 */
const api = {
    key: '',
    secret: '',
    debug: false,
    username: '',
    password: ''
};

const baseUrl = 'https://api.equitybankgroup.com';
/**
 * Constructor
 *
 * @param {object} opts - API Settings
 * @param {string} opts.consumerKey - Equity App Consumer Key
 * @param {string} opts.consumerSecret - Equity App Consumer Secret
 * @param {string} opts.username - Equity App Username
 * @param {string} opts.password - Equity App Password
 * @param {boolean} opts.debug - (Optional) Debugging Mode
 *
 */

const Equity = function (opts) {
    if (typeof opts !== 'object' || !opts.hasOwnProperty('consumerKey') || !opts.hasOwnProperty('consumerSecret') || !opts.hasOwnProperty('username') || !opts.hasOwnProperty('password')) {
        console.error(c.red(error.noKeyAndSecret));
        process.exit(1);
    }

    if (!(this instanceof Equity)) {
        return new Equity(opts);
    }

    api.key = opts.consumerKey;
    api.secret = opts.consumerSecret;
    api.username = opts.username;
    api.password = opts.password;
    api.debug = opts.debug || false;
};

// const auth = 'Basic ' + Buffer.from(api.key + ':' + api.secret).toString('base64');

//         const options = {
//             headers: {
//                 'Accept': '*/*',
//                 'Authorization': auth,
//                 'User-Agent': p.name + '/' + p.version,
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         };

//         r.post(baseUrl + endpoint.getToken, data, options, function (error, response) {
//             if (callback) {
//                 const err = null;
//                 let responseData;
//                 responseData = response.body;
//                 callback(err, responseData);
//             }

Equity.prototype = {

    /**
     * Change Merchant password
     *
     * @param {object} opts
     * @param {string opts.merchantId} - Merchant ID, provided by Equity Bank
     * @param {string opts.currentPassword} - Current Merchant Password
     * @param {string opts.newPassword} - New Merchant Password
     *
     */

    changePassword: function (opts, callback) {
        const data = {};

        if (typeof opts !== 'object') {
            console.error(c.red(error.missingParam));
        }

        if (!opts.hasOwnProperty('merchantId') || opts['merchantId'] === '') {
            console.error(c.red(error.noParam + 'merchant id'));
        }

        if (!opts.hasOwnProperty('currentPassword') || opts['currentPassword'] === '') {
            console.error(c.red(error.noParam + 'current password'));
        }

        data['currentPassword'] = opts['currentPassword'];

        if (!opts.hasOwnProperty('newPassword') || opts['newPassword'] === '') {
            console.error(c.red(error.noParam + 'new password'));
        }

        data['newPassword'] = opts['newPassword'];

        const auth = 'Bearer ' + process.env.TOKEN;

        const options = {
            headers: {
                'Accept': '*/*',
                'Authorization': auth,
                'User-Agent': p.name + '/' + p.version,
                'Content-Type': 'application/json'
            }
        };

        r.post(baseUrl + endpoint.changePassword + data.merchantId + '/changePassword', JSON.stringify(data), options, function (error, response) {
            if (callback) {
                const err = null;
                let responseData;
                responseData = response.body;
                callback(err, responseData);
            }
        });
    },
    /**
     * Purchase Airtime
     *
     * @param {object} opts
     * @param {string opts.mobileNumber} - Mobile Number For Which To Purchase Airtime
     * @param {string opts.amount} - Airtime Amount
     * @param {string opts.reference} - Airtime Reference
     * @param {string opts.telco} - Network Provider
     *
     */

    purchaseAirtime: function (opts, callback) {
        const data = {
            customer: {},
            airtime: {}
        };

        if (typeof opts !== 'object') {
            console.error(c.red(error.missingParam));
        }

        if (!opts.hasOwnProperty('mobileNumber') || opts['mobileNumber'] === '') {
            console.error(c.red(error.noParam + 'mobile number'));

        }

        data.customer['mobileNumber'] = opts['mobileNumber'];

        if (!opts.hasOwnProperty('amount') || opts['amount'] === '') {
            console.error(c.red(error.noParam + 'amount'));
        }

        data.airtime['amount'] = opts['amount'];

        if (!opts.hasOwnProperty('telco') || opts['telco'] === '') {
            console.error(c.red(error.noParam + 'telco'));
        }

        data.airtime['telco'] = opts['telco'];

        if (!opts.hasOwnProperty('reference') || opts['reference'] === '') {
            console.error(c.red(error.noParam + 'reference'));
        }

        data.airtime['reference'] = opts['reference'];

        const auth = 'Bearer ' + process.env.TOKEN;

        const options = {
            headers: {
                'Accept': '*/*',
                'Authorization': auth,
                'User-Agent': p.name + '/' + p.version,
                'Content-Type': 'application/json'
            }
        };

        r.post(baseUrl + endpoint.purchaseAirtime, JSON.stringify(data), options, function (error, response) {
            if (callback) {
                const err = null;
                let responseData;
                responseData = response.body;
                callback(err, responseData);
            }
        });
    },
    /**
     * Create Payment
     *
     * @param {object} opts
     * @param {string opts.mobileNumber} - Mobile Number For Which To PSend Money
     * @param {string opts.amount} - Amount
     * @param {string opts.description} - Transaction Description
     * @param {string opts.type} - Type
     * @param {string opts.auditNumber} - Audit Number
     *
     */

    createPayment: function (opts, callback) {
        const data = {
            customer: {},
            transaction: {}
        };

        if (typeof opts !== 'object') {
            console.error(c.red(error.missingParam));
        }

        if (!opts.hasOwnProperty('mobileNumber') || opts['mobileNumber'] === '') {
            console.error(c.red(error.noParam + 'mobile number'));
        }

        data.customer['mobileNumber'] = opts['mobileNumber'];

        if (!opts.hasOwnProperty('amount') || opts['amount'] === '') {
            console.error(c.red(error.noParam + 'amount'));
        }

        data.transaction['amount'] = opts['amount'];

        if (!opts.hasOwnProperty('description') || opts['description'] === '') {
            console.error(c.red(error.noParam + 'description'));
        }

        data.transaction['description'] = opts['description'];

        if (!opts.hasOwnProperty('type') || opts['type'] === '') {
            console.error(c.red(error.noParam + 'type'));
        }

        data.transaction['type'] = opts['type'];

        if (!opts.hasOwnProperty('auditNumber') || opts['auditNumber'] === '') {
            console.error(c.red(error.noParam + 'audit number'));
        }

        data.transaction['auditNumber'] = opts['auditNumber'];

        const auth = 'Bearer ' + process.env.TOKEN;

        const options = {
            headers: {
                'Accept': '*/*',
                'Authorization': auth,
                'User-Agent': p.name + '/' + p.version,
                'Content-Type': 'application/json'
            }
        };

        r.post(baseUrl + endpoint.createPayment, JSON.stringify(data), options, function (error, response) {
            if (callback) {
                const err = null;
                let responseData;
                responseData = response.body;
                callback(err, responseData);
            }
        });
    },
    /**
     * Get Payment Status
     *
     * @param {object} opts
     * @param {string opts.transactionId} - TransactionId
     *
     */

    paymentStatus: function (opts, callback) {
        const data = {};

        if (typeof opts !== 'object') {
            console.error(c.red(error.missingParam));
        }

        if (!opts.hasOwnProperty('transactionId') || opts['transactionId'] === '') {
            console.error(c.red(error.noParam + 'transaction id'));
        }

        const auth = 'Bearer ' + process.env.TOKEN;

        const options = {
            headers: {
                'Accept': '*/*',
                'Authorization': auth,
                'User-Agent': p.name + '/' + p.version,
                'Content-Type': 'application/json'
            }
        };

        r.get(baseUrl + endpoint.paymentStatus + data.transactionId, options, function (error, response) {
            if (callback) {
                const err = null;
                let responseData;
                responseData = response.body;
                callback(err, responseData);
            }
        });
    },
    /**
     * Online Remittance
     *
     * @param {object} opts
     * @param {string opts.transactionReference} - Transaction Reference
     * @param {string opts.senderName} - Sender Name
     * @param {string opts.accountNumber} - Account Number
     * @param {string opts.bicCode} - BIC CODE
     * @param {string opts.mobileNumber} - Mobile Number
     * @param {string opts.walletName} - Wallet Name
     * @param {string opts.bankCode} - Bank Code
     * @param {string opts.branchCode} - Branch Code
     * @param {string opts.countryCode} - Country Code
     * @param {string opts.currencyCode} - Currency Code
     * @param {string opts.amount} - Ammount
     * @param {string opts.paymentType} - Payment Type
     * @param {string opts.paymentReferences} - Payment References
     * @param {string opts.remarks} - Remarks
     *
     */

    onlineRemit: function (opts, callback) {
        const data = {
            source: {},
            destination: {},
            transfer: {}
        };

        if (typeof opts !== 'object') {
            console.error(c.red(error.missingParam));
        }

        if (!opts.hasOwnProperty('transactionReference') || opts['transactionReference'] === '') {
            console.error(c.red(error.noParam + 'transaction reference'));
        }

        data['transactionReference'] = opts['transactionReference'];

        if (!opts.hasOwnProperty('senderName') || opts['senderName'] === '') {
            console.error(c.red(error.noParam + 'sender name'));
        }

        data.source['senderName'] = opts['senderName'];

        if (!opts.hasOwnProperty('accountNumber') || opts['accountNumber'] === '') {
            console.error(c.red(error.noParam + 'account number'));
        }

        data.destination['accountNumber'] = opts['accountNumber'];

        if (!opts.hasOwnProperty('bicCode') || opts['bicCode'] === '') {
            console.error(c.red(error.noParam + 'BIC CODE'));
        }

        data.destination['bicCode'] = opts['bicCode'];

        if (!opts.hasOwnProperty('mobileNumber') || opts['mobileNumber'] === '') {
            console.error(c.red(error.noParam + 'mobile number'));
        }

        data.destination['mobileNumber'] = opts['mobileNumber'];

        if (!opts.hasOwnProperty('walletName') || opts['walletName'] === '') {
            console.error(c.red(error.noParam + 'wallet name'));
        }

        data.destination['walletName'] = opts['walletName'];

        if (!opts.hasOwnProperty('bankCode') || opts['bankCode'] === '') {
            console.error(c.red(error.noParam + 'bank code'));
        }

        data.destination['bankCode'] = opts['bankCode'];

        if (!opts.hasOwnProperty('branchCode') || opts['branchCode'] === '') {
            console.error(c.red(error.noParam + 'branch code'));
        }

        data.destination['branchCode'] = opts['branchCode'];

        if (!opts.hasOwnProperty('countryCode') || opts['countryCode'] === '') {
            console.error(c.red(error.noParam + 'country code'));
        }

        data.transfer['countryCode'] = opts['countryCode'];

        if (!opts.hasOwnProperty('currencyCode') || opts['currencyCode'] === '') {
            console.error(c.red(error.noParam + 'currency code'));
        }

        data.transfer['currencyCode'] = opts['currencyCode'];

        if (!opts.hasOwnProperty('amount') || opts['amount'] === '') {
            console.error(c.red(error.noParam + 'amount'));
        }

        data.transfer['amount'] = opts['amount'];

        if (!opts.hasOwnProperty('paymentType') || opts['paymentType'] === '') {
            console.error(c.red(error.noParam + 'payment type'));
        }

        data.transfer['paymentType'] = opts['paymentType'];

        if (!opts.hasOwnProperty('paymentReferences') || opts['paymentReferences'] === '') {
            console.error(c.red(error.noParam + 'payment references'));
        }

        data.transfer['paymentReferences'] = opts['paymentReferences'];

        if (!opts.hasOwnProperty('remarks') || opts['remarks'] === '') {
            console.error(c.red(error.noParam + 'remarks'));
        }

        data.transfer['remarks'] = opts['remarks'];

        const auth = 'Bearer ' + process.env.TOKEN;

        const options = {
            headers: {
                'Accept': '*/*',
                'Authorization': auth,
                'User-Agent': p.name + '/' + p.version,
                'Content-Type': 'application/json'
            }
        };

        r.post(baseUrl + endpoint.onlineRemit, JSON.stringify(data), options, function (error, response) {
            if (callback) {
                const err = null;
                let responseData;
                responseData = JSON.parse(response.body);
                callback(err, responseData);
            }
        });
    }
};

module.exports = Equity;
