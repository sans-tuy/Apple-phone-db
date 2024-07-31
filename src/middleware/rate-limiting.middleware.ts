import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';

// Configure the rate limiter
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: 4, // Limit each IP to 4 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});

@Injectable()
export class RateLimitingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    limiter(req, res, next);
  }
}
