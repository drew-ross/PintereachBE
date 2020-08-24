module.exports = {
  requireInBody
};

function requireInBody(keys) {
  return (req, res, next) => {
    const missing = [];
    if (keys.length === 0) {
      res.status(400).json({ message: `Please include request body.` });
    }
    keys.forEach(key => {
      if (!req.body.hasOwnProperty(key)) {
        missing.push(key);
      }
    });
    if (missing.length > 0) {
      res.status(400).json({ message: `Please include: ${missing.join(', ')}` });
    } else {
      next();
    }
  };
};