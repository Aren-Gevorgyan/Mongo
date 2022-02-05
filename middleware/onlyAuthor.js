const onlyAuthor = (req, res, next) => {
  const { id } = req.data;
  const getParamId = req.params.id;
  const ifAuthor = id === getParamId;

  if (ifAuthor) {
    next();
  } else {
    res.status(403).json({ message: "Error: You are not allowed"})
  }
};

module.exports = onlyAuthor;
