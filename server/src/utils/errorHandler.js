export const statusHandler = (err, req, res, next) => {
  console.error(err.message)

  switch (err.statusCode) {
    case 400:
      res.status(400).json({ error: err.message, success: false })
      break
    case 401:
      res.status(401).json({ error: err.message, success: false })
      break
    case 403:
      res.status(403).json({ error: err.message, success: false })
      break
    case 404:
      res.status(404).json({ error: err.message, success: false })
      break
    case 500:
      res.status(500).json({ error: err.message, success: false })
      break
    default:
      res.status(500).json({ error: err.message, success: false })
  }
}
