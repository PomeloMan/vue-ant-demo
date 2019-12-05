// @reference https://github.com/tschaub/gh-pages
// not work, to be continued
// "deploy": "gh-pages -d dist",
var ghpages = require('gh-pages');
var path = require('path');

ghpages.publish(path.join(__dirname), 'dist', {
  branch: 'gh-pages',
  repo: 'https://{username}:{password}@github.com/PomeloMan/vue-ant-demo.git'
}, function (err) { });
