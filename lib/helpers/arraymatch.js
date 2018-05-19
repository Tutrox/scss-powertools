/**
 * Check if string matches in all array values
 * @param {array} array Array to search from
 * @param {string} search Value to check match with
 */
function match (array, search) {
  let match = false;
  array.forEach(value => {
    if (value.endsWith(search)) match = true;
  });
  return match;
}

module.exports = match;