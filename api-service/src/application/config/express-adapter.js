const { Request } = require("#core/http/request");

const adaptRequest = (req) => Request({
  traceId: req.traceId,
  body: req.body,
  headers: req.headers,
  query: req.query,
  params: req.params,
  user: req.user,
})

const adaptController = (controller) => async (req, res, next) => {
  try {
    const request = adaptRequest(req)

    const response = await controller.handle(request);

    return res.status(response.statusCode).json(response.data);
  } catch (error) {
    next(error);
  }
};

const adaptMiddleware = (middleware) => async (req, res, next) => {
  try {
    const request = adaptRequest(req)

    const response = await middleware.handle(request);

    if(response?.statusCode){
      return res.status(response.statusCode).json(response.data);
    }

    // merge request data with express request
    Object.assign(req, request)

    next()
  } catch (error) {
    next(error);
  }
};

module.exports = {
  adaptController,
  adaptMiddleware
};
