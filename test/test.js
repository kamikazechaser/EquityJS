/**
 * EquityJS
 *
 * Mohammed Sohail <sohail@forfuture.tech>
 * Released Under AGPL-3.0
 */

/* eslint-disable no-console */

// npm-installed modules
const should = require("should");


// own modules
const Equity = require("../lib/equity");


// module variables
const equity = new Equity({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    sandbox: true
});

const timeout = 20 * 1000;

const token = process.env.TOKEN;


// tests
describe("module.exports", function () {
    it("exposes a function", function () {
        should(Equity).be.a.Function();
    });
});

describe("equity", () => {
    it("is an instance of Equity", function () {
        should(equity).be.an.instanceof(Equity);
    });
});

describe("Methods", function () {
    it("Obtain merchant access token", function (done) {
        this.timeout(timeout);
        equity.getToken("equityjs", "equityjs").then(resp => {
            should(resp.token_type).eql("bearer");
            should(resp.expires_in).eql("3599");
            return done();
        });
    });
    it("Change merchant password", function(done) {
        this.timeout(timeout);
        equity.changePassword(token, "100", "equityjs", "password").then(ctx => {
            should(ctx.status).eql("Success");
            return done();
        });
    });
    it("Purchase airtime", function(done) {
        this.timeout(timeout);
        equity.purchaseAirtime(token, "0764100000", 100, "Calls", "equitel").then(ctx => {
            should(ctx.referenceNumber).eql("123");
            should(ctx.status).eql("Success");
            should(ctx.rrn).eql("7218467");
            return done();
        });
    });
    it("Create payment", function(done) {
        this.timeout(timeout);
        equity.createPayment(token, "0764100000", 100, "Payment for calls", "normal", "555").then(ctx => {
            should(ctx.transactionRef).eql("123456");
            should(ctx.status).eql("Success");
            should(ctx.resultCode).eql("000");
            return done();
        });
    });
    it("Get payment status", function(done) {
        this.timeout(timeout);
        equity.paymentStatus(token, 555).then(ctx => {
            should(ctx.transactionReference).eql("1234");
            should(ctx.status).eql("Success");
            should(ctx.amount).eql("2000.00");
            should(ctx.mobileNumber).eql("2547630000000");
            return done();
        });
    });
    it("Online remmitance", function(done) {
        this.timeout(timeout);
        equity.onlineRemit(token, "AB78", "Sohail", "555", "555001", "07117778555", "main", "63254", "58755", "255", "USD", 555, "normal", [ "jon", "mark", "spencer"], "ok").then(ctx => {
            should(ctx.transactionId).eql("000000417772");
            should(ctx.status).eql("success");
            return done();
        });
    });
});
