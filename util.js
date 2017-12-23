// Strip HTML tags from string
exports.stripHTMLTags = function stripHTMLTags(str) {
  if (str === null || str === '') return false
  else str = str.toString()
  return str.replace(/<[^>]*>/g, '')
}
