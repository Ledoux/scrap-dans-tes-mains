module.exports.getTests = ({
  author,
  publisher,
  title
}) => {
  return [
    author.name,
    publisher.name,
    title
  ]
}
