const rateLimit = require("express-rate-limit");

const rateLimiter = (app) => {
  app.use(defaultLimiter);
  app.set('trust proxy', 1);
};

const defaultLimiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 20 minutes
  max: 100
});

const createAccountLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: "Too many accounts created from this IP, please try again after an hour"
});

module.exports = { rateLimiter, createAccountLimiter };