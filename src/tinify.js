
export const tinify = (object = {}, config = {}) => {
  const maxLength = config.maxLength || 50
  const tinyfiedObject = {}
  Object.keys(object)
    .forEach(key => {
      const value = object[key]
      if (typeof value === 'string') {
        tinyfiedObject[key] = value.length > maxLength
        ? `${value.slice(0, maxLength)}...`
        : value
      } else if (typeof value === 'object') {
        tinyfiedObject[key]= tinify(value)
      }
    })
  return tinyfiedObject
}
