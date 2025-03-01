'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    // this enables CORS for API requests
    'ember-cli-mirage': { enabled: false },
  });

  return app.toTree();
};
