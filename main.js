const express = require('express');
const consign = require('consign');

const app = express();

require('dotenv').config();

consign()
  .then('config')
  .then('common')
  .then('services')
  .then('controllers')
  .then('job.js')
  .into(app);

module.exports = app;