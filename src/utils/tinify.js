export const tinify = (value, config = {}) => {
  const maxLength = config.maxLength || 50
  // typeof value !== 'string' && console.log('value', value, typeof value)
  if (typeof value === 'string' || value instanceof RegExp) {
    return value.length > maxLength
      ? `${value.slice(0, maxLength)}...`
      : value
  } else if (Array.isArray(value)) {
    return value.map(value => tinify(value, config))
  } else if (typeof value === 'object') {
    if (value) {
      const tinifyObject = {}
      Object.keys(value)
        .forEach(key => tinifyObject[key] = tinify(value[key], config))
      return tinifyObject
    }
    return value
  }
  return value
}
