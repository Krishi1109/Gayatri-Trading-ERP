const pagination = (req, _res, next) => {
  req.pagination = {
    page: parseInt(req.query.page, 10) || 1,
    limit: parseInt(req.query.limit, 10) || 10,
  };
  next();
};

export default pagination;