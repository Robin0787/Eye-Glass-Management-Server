import { RequestHandler } from "express";

const notFoundRoute: RequestHandler = (req, res) => {
  res.send({
    success: false,
    message: "Api doesn't exist!",
  });
};

export default notFoundRoute;
