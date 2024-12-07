import rateLimit from 'express-rate-limit';

export default rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 100,
});
