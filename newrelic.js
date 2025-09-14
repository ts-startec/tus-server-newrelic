// Copyright (c) 2025 Tamojit Saha
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

'use strict';

exports.config = {
  app_name: [ process.env.NEW_RELIC_APP_NAME || 'tus-node-server' ],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  logging: { level: process.env.NEW_RELIC_LOGLEVEL || 'info' },
  allow_all_headers: true,
  attributes: {
    exclude: [
      'request.headers.cookie', 'request.headers.authorization',
      'response.headers.cookie', 'response.headers.authorization'
    ]
  }
};
