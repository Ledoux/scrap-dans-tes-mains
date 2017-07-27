"use strict";

module.exports.getTests = function (_ref) {
  var author = _ref.author,
      publisher = _ref.publisher,
      title = _ref.title;

  return [author.name, publisher.name, title];
};