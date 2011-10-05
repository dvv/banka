'use strict';

var DB = require('./db');

var db = new DB();

var context = {
  base: {
    query: function(query, aid) {
      this.ack(aid, null, [1,2,3]);
    }
  },
  bar: db.facetFor('bar')
};

//console.log(db);

module.exports = {
  context: db.facets
};
