/**
 * EquityJS
 *
 * Mohammed Sohail <sohail@forfuture.tech>
 * Released Under AGPL-3.0
 */

// npm-installed modules
const Pino = require("pino");
const request = require("request-promise");


// own modules
const pkg = require("../package");


// module variables
const logger = new Pino({ name: `${pkg.name} v${pkg.version}`, prettyPrint: true });


class Equity {
    /**
     * @class Equity
     * @constructor
     * @param {String} consumerKey (Required) Consumer key from Equity Bank.
     * @param {String} consumerSecret (Required) Consumer secret from Equity Bank.
     * @param {Boolean} sandbox (Optional) Enables sandbox API. Deafults to false.
     */

    constructor(opts) {
        this.consumerKey = opts.consumerKey ? opts.consumerKey : fatalError("You need to specify your Equity Bank consumer key.");
        this.consumerSecret = opts.consumerSecret ? opts.consumerSecret : fatalError("You need to specify your Equity Bank consumer secret.");
        this.sandbox = opts.sandbox ? opts.sandbox : false;
        this.baseUrl = this.sandbox ? "v1-sandbox" : "v1";
    }

    _requestStatus (token, params) {
        const options = {};
        options.method = "GET";
        options.uri = `https://api.equitybankgroup.com/transaction/${this.baseUrl}/payments/${params}`;
        options.headers = {
            "authorization": `Bearer ${token}`
        };
        options.json = true;
        return request(options)
            .then(ctx => {
                if (ctx.error === undefined) {
                    return ctx;
                } else {
                    return throwError(ctx);
                }
            })
            .catch(error => {
                return fatalError(error);
            });
    }

    _requestPost (token, method, params) {
        const options = {};
        options.method = "POST";
        options.uri = `https://api.equitybankgroup.com/transaction/${this.baseUrl}/${method}`;
        options.headers = {
            "authorization": `Bearer ${token}`,
            "user-agent": `${pkg.name}/${pkg.version}`
        };
        options.body = params;
        options.json = true;
        return request(options)
            .then(ctx => {
                if (ctx.error === undefined) {
                    return ctx;
                } else {
                    return throwError(ctx);
                }
            })
            .catch(error => {
                return fatalError(error);
            });
    }

    _requestPasswordChange(token, id, params) {
        const options = {};
        options.method = "POST";
        options.uri = `https://api.equitybankgroup.com/identity/${this.baseUrl}/merchants/${id}/changePassword`;
        options.headers = {
            "authorization": `Bearer ${token}`,
            "user-agent": `${pkg.name}/${pkg.version}`
        };
        options.body = params;
        options.json = true;
        return request(options)
            .then(ctx => {
                if (ctx.error === undefined) {
                    return ctx;
                } else {
                    return throwError(ctx);
                }
            })
            .catch(error => {
                return fatalError(error);
            });
    }

    _requestToken(params) {
        const options = {};
        options.method = "POST";
        options.uri = `https://api.equitybankgroup.com/identity/${this.baseUrl}/token`;
        options.headers = {
            "user-agent": `${pkg.name}/${pkg.version}`,
            "authorization": `Basic ${Buffer.from(this.consumerKey + ":" + this.consumerSecret).toString("base64")}`
        };
        options.json = true;
        options.form = params;
        return request(options)
            .then(ctx => {
                if (ctx.error === undefined) {
                    return ctx;
                } else {
                    return throwError(ctx);
                }
            })
            .catch(error => {
                return fatalError(error);
            });
    }

    /**
     * Generate an access token.
     * @param {String} username Merchant username, provided by Equity Bank.
     * @param {String} password Merchant password, provided by Equity Bank.
     * @return {Promise} Response.
     */
    getToken(username, password) {
        const opts= {};
        opts.username = username;
        opts.password = password;
        opts.grant_type = "password";
        return this._requestToken(opts);
    }

    /**
     * Change merchant password.
     * @param {String} token Access token.
     * @param {Number} id Merchant ID. provided by Equity Bank.
     * @param {String} currentPassword Merchant Username, provided by Equity Bank.
     * @param {String} newPassword Merchant Password, provided by Equity.
     * @return {Promise} Response.
     */
    changePassword(token, id, currentPassword, newPassword) {
        const opts= {};
        opts.currentPassword = currentPassword;
        opts.newPassword = newPassword;
        return this._requestPasswordChange(token, id, opts);
    }

    /**
     * Get payment status.
     * @param {String} token Access token.
     * @param {Number} id Transaction ID.
     * @return {Promise} Response.
     */
    paymentStatus(token, id) {
        return this._requestStatus(token, id);
    }

    /**
     * Purchase airtime.
     * @param {String} token Access token.
     * @param {String} mobileNumber Mobile Number For Which To Purchase Airtime.
     * @param {Number} amount Airtime amount.
     * @param {String} reference Airtime reference.
     * @param {String} telco Network operator.
     * @return {Promise} Response.
     */
    purchaseAirtime(token, mobileNumber, amount, reference, telco) {
        const opts = { customer: {}, airtime: {} };
        opts.customer.mobileNumber = mobileNumber;
        opts.airtime.amount = amount;
        opts.airtime.reference = reference;
        opts.airtime.telco = telco;
        return this._requestPost(token, "airtime", opts);
    }

    /**
     * Online remittance.
     * @param {String} token Access token.
     * @param {String} transactionReference Transaction reference.
     * @param {String} senderName Sender's name.
     * @param {String} accountNumber Account number.
     * @param {String} bicCode BIC code.
     * @param {String} mobileNumber Mobile number.
     * @param {String} walletName Wallet name.
     * @param {String} bankCode Bank code.
     * @param {String} branchCode Branch code.
     * @param {String} countryCode Country code.
     * @param {String} currencyCode Currency code.
     * @param {Number} amount Amount.
     * @param {String} paymentType Payment type.
     * @param {Array} paymentReferences 3 Payment references.
     * @param {String} remarks Additional remarks.
     * @return {Promise} Response.
     */
    onlineRemit(token, transactionReference, senderName, accountNumber, bicCode, mobileNumber, walletName, bankCode, branchCode, countryCode, currencyCode, amount, paymentType, paymentReferences, remarks) {
        const opts = { source: {}, destination: {}, transfer: {} };
        opts.transactionReference = transactionReference;
        opts.source.senderName = senderName;
        opts.destination.accountNumber = accountNumber;
        opts.destination.bicCode = bicCode;
        opts.destination.mobileNumber = mobileNumber;
        opts.destination.walletName = walletName;
        opts.destination.bankCode = bankCode;
        opts.destination.branchCode = branchCode;
        opts.transfer.countryCode = countryCode;
        opts.transfer.currencyCode = currencyCode;
        opts.transfer.amount = amount;
        opts.transfer.paymentType = paymentType;
        opts.transfer.paymentReferences = paymentReferences;
        opts.transfer.remarks = remarks;
        return this._requestPost(token, "remittance", opts);
    }

    /**
     * Create payment.
     * @param {String} token Access token.
     * @param {String} mobileNumber Mobile number.
     * @param {Number} amount Amount.
     * @param {String} description Payment description.
     * @param {String} type Payment type.
     * @param {String} auditNumber Audit number.
     * @return {Promise} Response.
     */
    createPayment(token, mobileNumber, amount, description, type, auditNumber) {
        const opts = { customer: {}, transaction: {} };
        opts.customer.mobileNumber = mobileNumber;
        opts.transaction.amount = amount;
        opts.transaction.description = description;
        opts.transaction.type = type;
        opts.transaction.auditNumber = auditNumber;
        return this._requestPost(token, "payments", opts);
    }
}

const fatalError = function(error) {
    logger.error(error);
    return process.exit(1);
};

const throwError = function(error) {
    return logger.error(error);
};

exports = module.exports = Equity;
