function debug(obj = {}) {
  return JSON.stringify(obj, null, 4);
}

function convertText(text) {
  return text.trim().toLowerCase();
}

module.exports = {
  debug,
  convertText,
};
