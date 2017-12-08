import 'fetch-everywhere'

export async function exists (url, config) {
  // unpack
  const type  = config.type || 'text/html'
  // fetch
  const { headers, ok, status } = await fetch(decodeURIComponent(url))
  const contentType = headers.get('content-type')
  // check
  return { isExistingUrl: ok && status === 200,
    isTypeValid: contentType && contentType.includes(type),
    contentType,
    ok,
    status,
    type,
    url
  }
}
