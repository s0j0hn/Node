/**
 * Module dependencies
 */
const axios = require('axios');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const path = require('path');
const _ = require('lodash');

const config = require(path.resolve('./config'));
const AppError = require(path.resolve('./lib/helpers/AppError'));


/**
 * @desc generate default params
 * @param {Object} p - params
 * @return {Object} result - params generated
 */
exports.setParams = (s) => {
  const result = {};
  if (s && s.length !== 0) {
    Object.keys(s).forEach((key) => {
      const func = String(s[key]).split('(')[0] || '';
      const params = String(s[key]).split('(')[1] ? String(s[key]).split('(')[1].slice(0, -1).split(',') : [];

      switch (func) {
        case 'DATE':
          try {
            let number;
            if (params[0].indexOf('-') > -1) number = Math.floor(Math.random() * Number(params[0].split('-')[1])) + Number(params[0].split('-')[0]);
            else number = Number(params[0]);
            result[key] = moment().add(number, String(params[1])).format(String(params[2]));
          } catch (err) {
            throw new AppError('Typing : format DATE error', { code: 'HELPERS_ERROR', details: err });
          }
          break;
        case 'RANDOM':
          try {
            result[key] = _.sample(params);
          } catch (err) {
            throw new AppError('Typing : format DATE error', { code: 'HELPERS_ERROR', details: err });
          }
          break;
        default:
          result[key] = s[key];
      }
    });
  }
  return result;
};
/**
 * @desc request
 * @param {String} r - request
 * @return {} result
 */
exports.request = async (api, params) => {
  try {
    const token = jwt.sign({ userId: api.serviceId }, config.jwtLou.secret, { expiresIn: config.jwtLou.expiresIn });

    const res = await axios({
      method: 'POST',
      url: api.url,
      headers: {
        Cookie: `TOKEN=${token}`,
      },
      data: params,
    });
    if (api.auth === 'lou' && res.data) return res.data;
    return res;
  } catch (err) {
    if (api.auth === 'lou' && err.response && err.response.data) throw new AppError('Lou server failed.', { code: 'HELPERS_ERROR', details: err.response.data });
    throw new AppError(`Distant server (${api.url}) not reachable.`, { code: 'HELPERS_ERROR', details: err });
  }
};

/**
 * @desc setScrapHistory
 * @param {Object} data - scraping result
 * @return {Object} mail status
 */
exports.setApiHistory = (status, err, start) => ({
  status,
  err: err || null,
  time: new Date() - start,
});