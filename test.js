   /**
     * EquityJs
     *
     * A Node.js Library For The Equity Eazzy API 
     * 
     * Mohammed Sohail <sohailsameja@gmail.com>
     * Released Under AGPL-v3 License
     *
     * Tests
     */

   /**
     * Node.js Dependencies
     *
     */
const should = require('should');
const Equity = require('.');

const timeout = 10 * 1000;

require('dotenv').config({
    silent: true
});

   /**
     * Expected
     */
const tokenType = 'bearer';
const expiryTime = '3599';
const success = 'Success';
const referenceNumber = '123';
const rrn = '7218467';
const transactionRef = '123456';
const resultCode = '000';
const amount = '2000.00';
const transactionReference = '1234';
const mobileNumber = '2547630000000';
const transactionId = '000000417772';
const statusRemit = 'success';

   /**
     * Initiate Tests
     */
const consumerKey = process.env.CONSUMER_KEY;
if (!consumerKey) {
    console.error('Error: Consumer key is required');
    process.exit(1);
}

const consumerSecret = process.env.CONSUMER_SECRET;
if (!consumerSecret) {
    console.error('Error: Consumer secret is required');
    process.exit(1);
}

const equity = new Equity({
    consumerKey: consumerKey,
    consumerSecret: consumerSecret
});

describe('module.exports', function() {
    it('exposes a function', function() {
        should(Equity).be.a.Function();
    });
});

describe('equity', function() {
    it('is an instance of Equity', function() {
        should(equity).be.an.instanceof(Equity);
    });
});

describe('Methods', function() {
    it('Obtain merchant access token', function(done) {
        this.timeout(timeout)
        equity.getToken({ username: 'equityjs', password: 'equityjs', grant_type: 'password' }, function(e, cb) {
            should(cb.token_type).eql(tokenType);
            should(cb.expires_in).eql(expiryTime);
            return done();
        });
    });
    it('Change merchant password', function(done) {
        this.timeout(timeout)
        equity.changePassword({ merchantId: '100', currentPassword: 'equityjs', newPassword: 'password' }, function(e, cb) {
            should(cb.status).eql(success);
            return done();
        });
    });
    it('Purchase airtime', function(done) {
        this.timeout(timeout)
        equity.purchaseAirtime({ mobileNumber: '0764100000', amount: '100', telco: 'equitel', reference: 'For calls' }, function(e, cb) {
            should(cb.referenceNumber).eql(referenceNumber);
            should(cb.status).eql(success);
            should(cb.rrn).eql(rrn);
            return done();
        });
    });
    it('Create payment', function(done) {
        this.timeout(timeout)
        equity.createPayment({ mobileNumber: '0764100000', amount: '100', description: 'equitel', type: 'For calls', auditNumber: '541' }, function(e, cb) {
            should(cb.transactionRef).eql(transactionRef);
            should(cb.status).eql(success);
            should(cb.resultCode).eql(resultCode);
            return done();
        });
    });
    it('Get payment status', function(done) {
        this.timeout(timeout)
        equity.paymentStatus({ transactionId: '100' }, function(e, cb) {
            should(cb.transactionReference).eql(transactionReference);
            should(cb.status).eql(success);
            should(cb.amount).eql(amount);            
            should(cb.mobileNumber).eql(mobileNumber);
            return done();
        });
    });
    it('Online remmitance', function(done) {
        this.timeout(timeout)
        equity.onlineRemit({ transactionReference: 'ok', senderName: 'sohail', accountNumber: '555', bicCode: '555001', mobileNumber: '07117778555', walletName: 'main', bankCode: '63254', branchCode: '58755', countryCode: '255', currencyCode: 'USD', amount: '555', paymentType: 'normal', paymentReferences: [ 'jon', 'mark', 'spencer'], remarks: 'ok' }, function(e, cb) {
            should(cb.transactionId).eql(transactionId);
            should(cb.status).eql(statusRemit);
            return done();
        });
    });     
});