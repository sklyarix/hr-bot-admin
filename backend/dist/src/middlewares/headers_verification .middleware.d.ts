import { NestMiddleware } from '@nestjs/common';
import type { NextFunction } from 'express';
export declare class HeadersVerificationMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
