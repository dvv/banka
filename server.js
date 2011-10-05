#!/usr/bin/env node
'use strict';

/**
 *
 * HTTP middleware
 *
 */

var Stack = require('la-scala');
Stack.errorHandler = function(req, res, err) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  if (err) {
    err = err.stack || err;
  } else {
    err = null;
  }
  res.end(JSON.stringify({error: err, result: null}));
};

function stack() { return [
  // body parser
  Stack.use('body')(),
  // RESTful-ish RPC
  Stack.use('rest')('/rpc/', { context: app.context, jsonrpc: true })
];}

var app = require('./app');

/**
 *
 * Workers
 *
 */

function Worker(port, host) {
  // HTTP server
  this.http = Stack.listen(stack(), {}, port, host);
  // notify
  console.log('Banka listening to http://' + host + ':' + port + '. Use Ctrl+C to stop.');
}

// spawn workers
var w1 = new Worker(60999);

// REPL for introspection
var repl = require('repl').start('node> ').context;
process.stdin.on('close', process.exit);
repl.w1 = w1;
