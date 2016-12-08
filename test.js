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
const http = require('http');
const should = require('should');
const Equity = require('.');

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


