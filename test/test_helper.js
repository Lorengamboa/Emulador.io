/**
 * Main helper class
 */

const mongoose = require('mongoose');

require('dotenv').config();

before((done) => {
    mongoose.connect(process.env.DBT_URI);
    mongoose.connection
      .once('open', () => { done(); })
      .on('error', (error) => {
        console.warn('Warning', error);
      });
  });

beforeEach((done) => {
  const {gbs} = mongoose.connection.collections;
    gbs.drop(() => {
        done();
    });
});
