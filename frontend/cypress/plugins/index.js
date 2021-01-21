module.exports = (on, config) => {
  // eslint-disable-next-line
  require('@cypress/code-coverage/task')(on, config);
  return config;
}
