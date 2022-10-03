const setCache = (duration = 300) => {
  return (req, res, next) => {
    if (req.method === 'GET') {
      res.set('Cache-control', `public, max-age=${duration}`)
    } else {
      res.set('Cache-control', `no-store`)
    }
    next()
  }
}

module.exports = setCache
